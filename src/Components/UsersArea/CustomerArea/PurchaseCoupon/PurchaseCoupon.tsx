import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { purchasedCouponAction } from "../../../../Redux/AppStates/CustomerAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import couponWebApi from "../../../../Services/WebApi/CouponWebApi";
import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0)
    const coupToPurchase = store.getState().couponReducer.allCoupons.filter(coup => coup.id === id)[0]

    const confirm = async () => {
        couponWebApi.purchaseCoupon(id)
            .then(() => {
                store.dispatch(purchasedCouponAction(coupToPurchase));
                navigate("/customers/coupons");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            })
    }

    const cancel = async () => {
        navigate("/coupons");
    }

    return (
        <div className="PurchaseCoupon">
            <div id="purchaseValidationContainer">
                <h2>Purchase Coupon #{coupToPurchase.id} ({coupToPurchase.title}) ?</h2>
                <div className="DecisionButtonContainer">
                <button className="decisionButton cancelButton" onClick={cancel}>Cancel</button>
                <button className="decisionButton confirmButton" onClick={confirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default PurchaseCoupon;
