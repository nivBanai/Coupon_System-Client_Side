import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCustomerCouponsAction } from "../../../../Redux/AppStates/CustomerAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import customerWebApi from "../../../../Services/WebApi/CustomerWebApi";
import utils from "../../../../Utils/Utils";
import "./GetCustomerCoupons.css";

function GetCustomerCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [originalCoupons, setOriginalCoupons] = useState<CouponModel[]>(store.getState().customerReducer.coupons);
    const [coupons, setCoupons] = useState<CouponModel[]>(originalCoupons);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    useEffect(() => {

        if (!store.getState().userReducer.user.token) {
            navigate("/login");
        }
        else if (coupons.length === 0) {
            customerWebApi.getAllCustomerCoupons()
                .then(res => {
                    // Update local state
                    setOriginalCoupons(res.data);
                    setCoupons(res.data);

                    // Update app state

                    store.dispatch(gotAllCustomerCouponsAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => notificationsService.errorNotification(err.response.data.message));
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
    }, [selectedCategory, selectedPrice]
    )

    return (
        <div className="GetCustomerCoupons">
            {
                (coupons?.length > 0 || originalCoupons.length > 0) ?
                    <>

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
                                    <li>{coup.id}</li>
                                    <li>{utils.fixedCategory(coup.category)}</li>
                                    <li>{coup.title}</li>
                                    <li>{coup.description}</li>
                                    <li>{coup.startDate}</li>
                                    <li>{coup.endDate}</li>
                                    <li>{coup.price}</li>
                                    <li><img src={coup.image} alt="N/A" /></li>
                                </ol>

                            </div>
                        )}</>

                    : <div></div>
            }
        </div>
    );
}

export default GetCustomerCoupons;
