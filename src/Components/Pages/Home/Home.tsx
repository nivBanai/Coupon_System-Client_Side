import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import { gotAlmostOutOfStockCouponsAction } from "../../../Redux/AppStates/CouponAppState";
import store from "../../../Redux/Store";
import notificationsService from "../../../Services/NotificationsService";
import couponWebApi from "../../../Services/WebApi/CouponWebApi";
import utils from "../../../Utils/Utils";
import "./Home.css";

function Home(): JSX.Element {

    const navigate = useNavigate();
    const [user, setUser] = useState(store.getState().userReducer.user);
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponReducer.almostOutOfStockCoupons);

    const isValidCustomer = (): boolean => {
        return (user.token && user.clientType === "CUSTOMER") ? true : false;
    };

    const purchaseCoupon = (id: number) => {
        console.log(coupons);
        navigate("/coupons/purchase/" + id);
    }

    useEffect(() => {
        if (coupons.length === 0) {
            couponWebApi.getAlmostOutOfStockCoupons()
                .then(res => {
                    setCoupons(res.data);
                    store.dispatch(gotAlmostOutOfStockCouponsAction(res.data));
                })
                .catch(err =>
                    notificationsService.errorNotification(err.response.data.message));
        }
    }, []);


    useEffect(() => {
        if (coupons.map(coup => coup.amount === 0)) {
            couponWebApi.getAlmostOutOfStockCoupons()
                .then(res => {
                    setCoupons(res.data);
                    store.dispatch(gotAlmostOutOfStockCouponsAction(res.data));
                })
                .catch(err =>
                    notificationsService.errorNotification(err.response.data.message));
        }
    }, []);

    return (
        <div className="Home">

            <h1>Welcome Back!</h1>

            {

                (coupons.length > 0) ?
                    <>
                        <div id="homeContainer">
                            <h1 id="homeCouponsTitle">There Are Only A Few Left, Hurry Up And Check These Coupons Out!</h1>

                            <div className="Coupons">
                                {coupons.map((coup, idx) =>

                                    <div className="Coupon" key={idx}>
                                        <div id="couponHeader">
                                            <p className="couponHeaderItems" id="idTitle">#{coup.id}</p>
                                            <h2 className="couponHeaderItems" >{coup.title}</h2>
                                        </div>
                                        <p><img className="CouponImg" src={coup.image} alt="N/A" /></p>

                                        <p className="couponItem" id="displayCategory"> {utils.fixedCategory(coup.category)}</p>

                                        <p id="tooltip">*Description*
                                            <span id="tooltiptext">{coup.description}</span>
                                        </p>

                                        <p className="couponItem" id="displayDate"> {utils.fixedDate(coup.startDate)} - {utils.fixedDate(coup.endDate)}</p>

                                        <div className="couponItem " id="displayAmount" >
                                            <p className={(coup.amount > 5) ? "displayGreenAmount" : "displayOrangeAmount"}>{coup.amount} Left</p>

                                        </div>
                                        <div id="couponFooter">
                                            <p id="displayPrice">
                                                {coup.price} &#x20AA;
                                            </p>
                                            {(isValidCustomer()) ?

                                                <button id="purchaseButton" disabled={(coup.amount === 0)} onClick={() => purchaseCoupon(coup.id)}>Purchase</button>

                                                : <Link id="loginToPurchase" to={"/login"}>Login to purchase</Link>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>

                    : <div>
                        <img id="homeImg" src="https://media3.giphy.com/media/NBCUdhhWqU4i7VQ34z/200w.webp" alt="" />
                    </div>

            }

        </div>
    );
}

export default Home;
