import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllPurchasableCouponsAction, purchasedCouponAction } from "../../../../Redux/AppStates/CustomerAppState";
import store from "../../../../Redux/Store";
import customerWebApi from "../../../../Services/WebApi/CustomerWebApi";
import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {

    const navigate = useNavigate();
    const [purchasableCoupons, setPurchasableCoupons] = useState<CouponModel[]>(store.getState().customerReducer.purchasableCoupons);

    useEffect(() => {

        if (purchasableCoupons.length === 0) {
            customerWebApi.getAllPurchasableCoupons()
                .then(res => {
                    // Update local state
                    setPurchasableCoupons(res.data);

                    // Update app state

                    store.dispatch(gotAllPurchasableCouponsAction(res.data))

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => console.log(err));
        }
    }, []);

    const purchaseCoupon = async (coupon: CouponModel) => {
        await customerWebApi.purchaseCoupon(coupon)
            .then(res => {
                store.dispatch(purchasedCouponAction(res.data))
                navigate("/customers/coupons");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="PurchaseCoupon">
            {
                (purchasableCoupons?.length > 0) ?
                    <>{purchasableCoupons.map((coup, idx) =>
                        <div key={idx}>
                            <ol>
                                <li>{coup.id}</li>
                                <li>{coup.category}</li>
                                <li>{coup.title}</li>
                                <li>{coup.description}</li>
                                <li>{coup.startDate}</li>
                                <li>{coup.endDate}</li>
                                <li>{coup.amount}</li>
                                <li>{coup.price}</li>
                                <li><img src={coup.image} alt="N/A" /></li>
                                <li>
                                    <button onClick={() => purchaseCoupon(coup)}>Purchase</button>
                                </li>
                            </ol>

                        </div>
                    )}</>

                    : <div></div>
            }
        </div>
    );
}

export default PurchaseCoupon;
