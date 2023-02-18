import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCustomerCouponsAction } from "../../../../Redux/AppStates/CustomerAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import customerWebApi from "../../../../Services/WebApi/CustomerWebApi";
import utils from "../../../../Utils/Utils";
import EmptyCustomerCouponsView from "./EmptyCustomerCouponsView/EmptyCustomerCouponsView";
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
                        {



                            <>
                                <div className="TitleContainer">
                                    <h1>My Coupons</h1>
                                </div>
                                <div className="SearchBarsContainer">
                                    <div className="SearchBar">
                                        <h3>Filter By Category </h3>
                                        <select onChange={val => { setSelectedCategory(val.target.value); }} id="category" defaultValue={"All"}>
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
                                    {coupons.map((coup, idx) => <div className="OwnedCoupon" key={idx}>
                                        <div id="couponHeader">
                                            <p className="couponHeaderItems ownedCouponIdTitle">#{originalCoupons.indexOf(coup) + 1}</p>
                                            <h2 className="couponHeaderItems">{coup.title}</h2>
                                        </div>
                                        <p><img className="CouponImg" src={coup.image} alt="N/A" /></p>

                                        <p className="couponItem" id="displayCategory"> {utils.fixedCategory(coup.category)}</p>

                                        <p id="ownedCouponDesc">{coup.description}</p>


                                        <p className="couponItem" id="displayDate"> {utils.fixedDate(coup.startDate)} - {utils.fixedDate(coup.endDate)}</p>
                                        <div >
                                            <p className="displayOwnedCouponPrice">
                                                {coup.price} &#x20AA;
                                            </p>
                                        </div>
                                    </div>
                                    )}
                                </div>

                            </>

                        }
                    </>

                    : <div><EmptyCustomerCouponsView /></div>
            }
        </div>
    );
}

export default GetCustomerCoupons;
