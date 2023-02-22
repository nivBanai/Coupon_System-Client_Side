import { useNavigate } from "react-router-dom";
import "./EmptyCompanyCouponsView.css";

function EmptyCompanyCouponsView(): JSX.Element {

    const navigate = useNavigate();

    const addCoupon = () => {
        navigate("add");
    }

    return (
        <div className="EmptyCompanyCouponsView EmptyUserCouponsView">

            <h1>Your Coupons List Is Currently Empty</h1>

            <div className="AddCouponButtonContainer">
                <button className="AddCouponButton" onClick={() => addCoupon()}>Add Coupon</button>
            </div>

        </div>
    );
}

export default EmptyCompanyCouponsView;
