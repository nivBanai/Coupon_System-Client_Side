import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCompanyCouponsAction } from "../../../../Redux/AppStates/CompanyAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import utils from "../../../../Utils/StringUtils";
import { TbEdit } from "react-icons/tb";
import { ImBin2 } from "react-icons/im";
import "./GetCompanyCoupons.css";
import EmptyCompanyCouponsView from "./EmptyCompanyCouponsView/EmptyCompanyCouponsView";

function GetCompanyCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [originalCoupons, setOriginalCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);
    const [coupons, setCoupons] = useState<CouponModel[]>(originalCoupons);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const addCoupon = () => {
        navigate("add");
    };

    const deleteCoupon = (id: number) => {
        navigate("delete/" + id);
    };

    const updateCoupon = (id: number) => {
        navigate("update/" + id);
    };

    useEffect(() => {

        if (coupons.length === 0) {
            companyWebApi.getAllCompanyCoupons()
                .then(res => {
                    setOriginalCoupons(res.data);
                    setCoupons(res.data);
                    store.dispatch(gotAllCompanyCouponsAction(res.data))
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
    }, [selectedCategory, selectedPrice]);


    return (
        <div className="GetCompanyCoupons">

            {
                (coupons.length > 0 || originalCoupons.length > 0) ?
                    <>
                        <div className="TitleContainer">
                            <h1>My Coupons</h1>
                        </div>

                        <div className="SearchBarsContainer">

                            <div className="SearchBar">

                                <h3>Filter By Category </h3>

                                <select onChange={val => { setSelectedCategory(val.target.value) }} id="category" defaultValue={"All"} >
                                    <option value={"All"}>All</option>
                                    <option value={"CINEMA"}>Cinema</option>
                                    <option value={"FOOD"}>Food</option>
                                    <option value={"SPORTS_GEAR"}>Sports Gear</option>
                                    <option value={"TRADING_CARDS"}>Trading Cards</option>
                                    <option value={"VIDEO_GAMES"}>Video Games</option>
                                </select>

                            </div>

                            <div className="SearchBar">

                                <h3>Filter By Max Price</h3>

                                <input onChange={(val) => setSelectedPrice(+val.target.value)} id="price" name="price" type="number"
                                    placeholder="Type Price" />

                            </div>

                        </div>

                        <div className="AddCouponButtonContainer">
                            <button className="AddCouponButton" onClick={() => addCoupon()}>Add Coupon</button>
                        </div>

                        <div className="Coupons">
                            {coupons.map((coup, idx) =>
                                <div id="companyOwnedCoupon" key={idx}>

                                    <div className="CouponHeader">
                                        <p className="CouponHeaderItem OwnedCouponIdTitle">#{originalCoupons.indexOf(coup) + 1}</p>
                                        <h2 className="CouponHeaderItem">{coup.title}</h2>
                                    </div>

                                    <p><img className="OwnedCouponImg" src={coup.image} alt="N/A" /></p>

                                    <p className="CouponItem DisplayCategory" > {utils.fixedCategory(coup.category)}</p>

                                    <p className="OwnedCouponDesc">{coup.description}</p>

                                    <p className="CouponItem DisplayDate"> {utils.fixedDate(coup.startDate)} - {utils.fixedDate(coup.endDate)}</p>

                                    <div className="CouponItem DisplayAmount">
                                        {(coup.amount > 0) ?
                                            <p className={(coup.amount > 5) ? "DisplayGreenAmount" : "DisplayOrangeAmount"}>{coup.amount} Left</p>
                                            : <p className="DisplayRedAmount"> Out Of Stock</p>
                                        }
                                    </div>

                                    <div id="companyCouponFooter">
                                        <p className="DisplayOwnedCouponPrice">
                                            {coup.price} &#x20AA;
                                        </p>

                                        <p>
                                            <button onClick={() => updateCoupon(coup.id)}><TbEdit size={40} /></button>
                                            <button onClick={() => deleteCoupon(coup.id)}><ImBin2 size={40} /></button>
                                        </p>
                                    </div>

                                </div>
                            )}
                        </div>
                    </>
                    : <EmptyCompanyCouponsView />
            }

        </div>
    );
}

export default GetCompanyCoupons;
