import { Link } from "react-router-dom";
import "./EmptyCustomerCouponsView.css";

function EmptyCustomerCouponsView(): JSX.Element {
    return (
        <div className="EmptyCustomerCouponsView">
			<h1>Your Coupons List Is Currently Empty</h1>
            <h2>Click <Link to={"/coupons"} >here</Link> to purchase new coupons!</h2>
        </div>
    );
}

export default EmptyCustomerCouponsView;
