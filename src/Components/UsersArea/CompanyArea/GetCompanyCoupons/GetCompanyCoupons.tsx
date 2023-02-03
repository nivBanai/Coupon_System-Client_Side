import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCompanyCouponsAction } from "../../../../Redux/AppStates/CompanyAppState";

import store from "../../../../Redux/Store";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import utils from "../../../../Utils/Utils";
import "./GetCompanyCoupons.css";

function GetCompanyCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [originalCoupons, setOriginalCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);
    const [coupons, setCoupons] = useState<CouponModel[]>(originalCoupons);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const addCoupon = () => {
        navigate("add");
    }

    const deleteCoupon = (id: number) => {
        navigate("delete/" + id);
    }

    const updateCoupon = (id: number) => {
        navigate("update/" + id);
    }

    useEffect(() => {

        if (!store.getState().userReducer.user.token) {
            navigate("/login");
        }
        else if (coupons.length === 0) {
            companyWebApi.getAllCompanyCoupons()
                .then(res => {
                    setOriginalCoupons(res.data);
                    setCoupons(res.data);
                    store.dispatch(gotAllCompanyCouponsAction(res.data))
                })
                .catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {
        if (selectedCategory === "All" && selectedPrice === 0) {
            setCoupons(originalCoupons);
        }
        if (selectedCategory === "All" && selectedPrice !== 0) {
            setCoupons(originalCoupons.filter(coup => coup.price < selectedPrice));
        }
        if (selectedCategory !== "All" && selectedPrice === 0) {
            setCoupons(originalCoupons.filter(coup => coup.category.match(selectedCategory)));
        }
        if (selectedCategory !== "All" && selectedPrice !== 0) {
            setCoupons(originalCoupons.filter(coup => coup.category.match(selectedCategory) && coup.price < selectedPrice));
        }
    }, [selectedCategory, selectedPrice]);


    return (
        <div className="GetCompanyCoupons">

            {
                (coupons?.length > 0 || originalCoupons?.length > 0) ?

                    <>
                     <button onClick={() => addCoupon()}>Add Coupon</button>
                        <span>Filter By Category </span>
                        <select onChange={val => { { setSelectedCategory(val.target.value); console.log("coups:" + coupons); console.log("ogCoupos:" + originalCoupons); } }} id="category" defaultValue={"All"} >
                            <option value={"All"}>All</option>
                            <option value={"CINEMA"}>Cinema</option>
                            <option value={"FOOD"}>Food</option>
                            <option value={"SPORTS_GEAR"}>Sports Gear</option>
                            <option value={"TRADING_CARDS"}>Trading Cards</option>
                            <option value={"VIDEO_GAMES"}>Video Games</option>
                        </select>

                        <span>Filter By Price</span>
                        <input onChange={(val) => setSelectedPrice(+val.target.value)} id="price" name="price" type="number" placeholder="price" />

                        {coupons.map((coup, idx) =>
                            <div key={idx}>
                                <ol>
                                    <li>{originalCoupons.indexOf(coup) + 1}</li>
                                    <li>{utils.fixedCategory(coup.category)}</li>
                                    <li>{coup.title}</li>
                                    <li>{coup.description}</li>
                                    <li>{coup.startDate}</li>
                                    <li>{coup.endDate}</li>
                                    <li>{coup.amount}</li>
                                    <li>{coup.price}</li>
                                    <li><img src={coup.image} alt="N/A" /></li>
                                    <li>
                                        <button onClick={() => deleteCoupon(coup.id)}>Delete</button>
                                        <button onClick={() => updateCoupon(coup.id)}>Update</button>
                                    </li>
                                </ol>

                            </div>
                        )}</>

                    : <div>No Coupons Currently</div>
            }

        </div>
    );
}

export default GetCompanyCoupons;
