import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCouponsAction } from "../../../../Redux/AppStates/CouponAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import couponWebApi from "../../../../Services/WebApi/CouponWebApi";
import utils from "../../../../Utils/Utils";
import EmptyCouponsView from "./EmptyCouponsView/EmptyCouponsView";
import "./GetAllCoupons.css";

function GetAllCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [user, setUser] = useState(store.getState().userReducer.user);
    const [originalCoupons, setOriginalCoupons] = useState<CouponModel[]>(store.getState().couponReducer.allCoupons);
    const [coupons, setCoupons] = useState<CouponModel[]>(originalCoupons);
    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>(store.getState().customerReducer.coupons);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const isValidCustomer = (): boolean => {
        return (user.token && user.clientType === "CUSTOMER") ? true : false;
    };

    const couponsWithOutCustomerCoupons = (coupons: CouponModel[]): CouponModel[] => {
        return coupons.filter(coup => !customerCoupons.map(coup => coup.id).includes(coup.id))
    }

    const purchaseCoupon = (id: number) => {
        navigate("purchase/" + id);
    }

    useEffect(() => {

        if (originalCoupons.length === 0) {
            couponWebApi.getAllCoupons()
                .then(res => {
                    // Update local state
                    setOriginalCoupons(res.data);

                    if (store.getState().userReducer.user.token) {
                        setCoupons(couponsWithOutCustomerCoupons(res.data));
                    } else {
                        setCoupons(res.data);
                    }

                    store.dispatch(gotAllCouponsAction(res.data))
                    // Update app state

                    console.log(originalCoupons);


                    // console.log(ids);
                    // console.log(originalAllCoupons);
                    // console.log(intersection);

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err =>
                    notificationsService.errorNotification(err.response.data.message));
        }
    }, []);


    // useEffect(() => {

    //     if (store.getState().userReducer.user.token) {
    //         setCoupons(originalCoupons.filter(coup => !customerCoupons.map(coup => coup.id).includes(coup.id)));
    //     }
    // }, []);

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
                                    <div id="couponHeader">
                                        <p className="couponHeaderItems" id="idTitle">#{coup.id}</p>
                                        <h2 className="couponHeaderItems" >{coup.title}</h2>
                                    </div>
                                    <p><img className="CouponImg" src={coup.image} alt="N/A" /></p>
                                    {/* <span className="itemHeader">Category:</span> */}
                                    <p className="couponItem" id="displayCategory"> {utils.fixedCategory(coup.category)}</p>

                                    {/* <span className="itemHeader">Description:</span> */}
                                    {/* <p className="couponItem" id="description">{coup.description}</p> */}

                                    <p id="tooltip">*Description*
                                        <span id="tooltiptext">{coup.description}</span>
                                    </p>


                                    {/* <span className="itemHeader">Duration:</span> */}
                                    <p className="couponItem" id="displayDate"> {utils.fixedDate(coup.startDate)} - {utils.fixedDate(coup.endDate)}</p>
                                    {/* <span className="itemHeader">Amount:</span> */}
                                    <div className="couponItem " id="displayAmount" >
                                        {(coup.amount > 0) ?
                                            <p className={(coup.amount > 5) ? "displayGreenAmount" : "displayOrangeAmount"}>{coup.amount} Left</p>
                                            : <p className="displayRedAmount"> Out Of Stock</p>
                                        }
                                    </div>
                                    <div id="couponFooter">
                                        <p id="displayPrice">
                                            {coup.price} &#x20AA;
                                        </p>
                                        {(isValidCustomer()) ?

                                            <button id="purchaseButton" disabled={(coup.amount === 0)} onClick={() => purchaseCoupon(coup.id)}>Purchase</button>

                                            : (coup.amount) ? <Link id="loginToPurchase" to={"/login"}>Login to purchase</Link>
                                                : <></>
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
