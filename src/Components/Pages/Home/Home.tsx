import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/Coupon";
import { gotAlmostOutOfStockCouponsAction } from "../../../Redux/AppStates/CouponAppState";
import store from "../../../Redux/Store";
import notificationsService from "../../../Services/NotificationsService";
import couponWebApi from "../../../Services/WebApi/CouponWebApi";
import authUtils from "../../../Utils/AuthUtils";
import utils from "../../../Utils/StringUtils";
import "./Home.css";

function Home(): JSX.Element {

    const navigate = useNavigate();
    const user = store.getState().userReducer.user;
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponReducer.almostOutOfStockCoupons);

    const purchaseCoupon = (id: number) => {
        navigate("/coupons/purchase/" + id);
    };

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
                            <h1 id="homeOfferTitle">There Are Only A Few Left, Hurry Up And Check These Coupons Out!</h1>

                            <div className="Coupons">
                                {coupons.map((coup, idx) =>
                                    <div className="Coupon" key={idx}>

                                        <div className="CouponHeader">
                                            <p className="CouponHeaderItem CouponIdTitle">#{coup.id}</p>
                                            <h2 className="CouponHeaderItem" >{coup.title}</h2>
                                        </div>

                                        <p><img src={coup.image} alt="N/A" /></p>

                                        <p className="CouponItem DisplayCategory"> {utils.fixedCategory(coup.category)}</p>

                                        <p className="DescTooltip">*Description*
                                            <span className="DescTooltipText">{coup.description}</span>
                                        </p>

                                        <p className="CouponItem DisplayDate"> {utils.fixedDate(coup.startDate)} - {utils.fixedDate(coup.endDate)}</p>

                                        <div className="CouponItem DisplayAmount">
                                            <p className={(coup.amount > 5) ? "DisplayGreenAmount" : "DisplayOrangeAmount"}>{coup.amount} Left</p>
                                        </div>

                                        <div id="homeCouponFooter">
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
                            
                        </div>
                    </>
                    :
                    <div>
                        <img id="homeImg" src="https://media3.giphy.com/media/NBCUdhhWqU4i7VQ34z/200w.webp" alt="" />
                    </div>

            }

        </div>
    );
}

export default Home;
