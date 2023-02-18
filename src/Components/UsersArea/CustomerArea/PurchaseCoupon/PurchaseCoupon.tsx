import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { purchasedCustomerCouponAction } from "../../../../Redux/AppStates/CouponAppState";
import { purchasedCouponAction } from "../../../../Redux/AppStates/CustomerAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import couponWebApi from "../../../../Services/WebApi/CouponWebApi";
import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0)
    const [coupToPurchase, setCoupToPurchase] = useState<CouponModel>();

    useEffect(() => {
        if (store.getState().couponReducer.allCoupons.length === 0) {
            setCoupToPurchase(store.getState().couponReducer.almostOutOfStockCoupons.filter(coup => coup.id === id)[0]);
            return;
        }
        setCoupToPurchase(store.getState().couponReducer.allCoupons.filter(coup => coup.id === id)[0])
    }, []);

    const confirm = async () => {
        couponWebApi.purchaseCoupon(id)
            .then(res => {
                store.dispatch(purchasedCouponAction(res.data));
                store.dispatch(purchasedCustomerCouponAction(res.data));
                navigate("/customers/coupons");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            })
    }

    const cancel = async () => {
        console.log(coupToPurchase);
        navigate("/coupons");
    }

    return (
        <div className="PurchaseCoupon">
            <div id="purchaseValidationContainer">
                <h2>Purchase Coupon #{coupToPurchase?.id} ({coupToPurchase?.title}) ?</h2>
                <div className="DecisionButtonContainer">
                    <button className="decisionButton cancelButton" onClick={cancel}>Cancel</button>
                    <button className="decisionButton confirmButton" onClick={confirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default PurchaseCoupon;
