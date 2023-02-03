import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { purchasedCouponAction } from "../../../../Redux/AppStates/CustomerAppState";
import store from "../../../../Redux/Store";
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
                console.log(err);
            })
    }

    const cancel = async () => {
        navigate("/coupons");
    }

    return (
        <div className="PurchaseCoupon">
            <div>
                <p>Are you sure you want to purchase #{coupToPurchase.id} ({coupToPurchase.title}) ?</p>
            </div>
            <div>
                <button onClick={cancel}>Cancel</button>
                <button onClick={confirm}>Confirm</button>
            </div>
        </div>
    );
}

export default PurchaseCoupon;
