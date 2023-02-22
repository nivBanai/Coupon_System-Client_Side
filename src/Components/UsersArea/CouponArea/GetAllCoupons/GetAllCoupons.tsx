import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCouponsAction } from "../../../../Redux/AppStates/CouponAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import couponWebApi from "../../../../Services/WebApi/CouponWebApi";
import authUtils from "../../../../Utils/AuthUtils";
import utils from "../../../../Utils/StringUtils";
import EmptyCouponsView from "./EmptyCouponsView/EmptyCouponsView";
import "./GetAllCoupons.css";

function GetAllCoupons(): JSX.Element {

    const navigate = useNavigate();
    const user = store.getState().userReducer.user;
    const [originalCoupons, setOriginalCoupons] = useState<CouponModel[]>(store.getState().couponReducer.allCoupons);
    const [coupons, setCoupons] = useState<CouponModel[]>(originalCoupons);
    const customerCoupons = store.getState().customerReducer.coupons;
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const couponsWithOutCustomerCoupons = (coupons: CouponModel[]): CouponModel[] => {
        return coupons.filter(coup => !customerCoupons.map(coup => coup.id).includes(coup.id));
    };

    const purchaseCoupon = (id: number) => {
        navigate("purchase/" + id);
    };

    useEffect(() => {

        if (originalCoupons.length === 0) {
            couponWebApi.getAllCoupons()
                .then(res => {
                    setOriginalCoupons(res.data);

                    if (store.getState().userReducer.user.token) {
                        setCoupons(couponsWithOutCustomerCoupons(res.data));
                    } else {
                        setCoupons(res.data);
                    }

                    store.dispatch(gotAllCouponsAction(res.data))
                })
                .catch(err =>
                    notificationsService.errorNotification(err.response.data.message));
        }
    }, []);

    useEffect(() => {
        if (selectedCategory === "All" && selectedPrice === 0) {
            setCoupons(couponsWithOutCustomerCoupons(originalCoupons));
        }
        if (selectedCategory === "All" && selectedPrice !== 0) {
            setCoupons(couponsWithOutCustomerCoupons(originalCoupons).filter(coup => coup.price < selectedPrice));
        }
        if (selectedCategory !== "All" && selectedPrice === 0) {
            setCoupons(couponsWithOutCustomerCoupons(originalCoupons).filter(coup => coup.category.match(selectedCategory)));
        }
        if (selectedCategory !== "All" && selectedPrice !== 0) {
            setCoupons(couponsWithOutCustomerCoupons(originalCoupons).filter(coup => coup.category.match(selectedCategory) && coup.price < selectedPrice));
        }
    }, [selectedCategory, selectedPrice]);

    return (
        <div className="GetAllCoupons">

            {
                (coupons.length > 0 || originalCoupons.length > 0) ?
                    <>
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

                        <div className="Coupons">
                            {coupons.map((coup, idx) =>

                                <div className="Coupon" key={idx}>
                                    <div className="CouponHeader">
                                        <p className="CouponHeaderItem CouponIdTitle" >#{coup.id}</p>
                                        <h2 className="CouponHeaderItem" >{coup.title}</h2>
                                    </div>

                                    <p><img src={coup.image} alt="N/A" /></p>

                                    <p className="CouponItem DisplayCategory"> {utils.fixedCategory(coup.category)}</p>

                                    <p className="DescTooltip">*Description*
                                        <span className="DescTooltipText">{coup.description}</span>
                                    </p>

                                    <p className="CouponItem DisplayDate"> {utils.fixedDate(coup.startDate)} - {utils.fixedDate(coup.endDate)}</p>

                                    <div className="CouponItem DisplayAmount">
                                        {(coup.amount > 0) ?
                                            <p className={(coup.amount > 5) ? "DisplayGreenAmount" : "DisplayOrangeAmount"}>{coup.amount} Left</p>
                                            : <p className="DisplayRedAmount"> Out Of Stock</p>
                                        }
                                    </div>

                                    <div id="PurchasableCouponFooter">

                                        <p className="DisplayPrice">
                                            {coup.price} &#x20AA;
                                        </p>

                                        {(authUtils.isValidCustomer(user)) ?
                                            <button className="PurchaseButton" disabled={(coup.amount === 0)} onClick={() => purchaseCoupon(coup.id)}>Purchase</button>
                                            : <Link className="LoginToPurchase" to={"/login"}>Login to purchase</Link>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </>

                    : <EmptyCouponsView />
            }
        </div>
    );
}

export default GetAllCoupons;
