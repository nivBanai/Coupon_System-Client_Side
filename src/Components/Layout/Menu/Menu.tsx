import { Link } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <Link className="Link" to={"home"}>Home</Link>
            <Link className="Link" to={"about"}>About</Link>
            <Link className="Link" to={"coupons"}>Coupons</Link>
            <Link className="Link" to={"companies"}>Companies</Link>
            <Link className="Link" to={"companies/add"}>Add Company</Link>
            <Link className="Link" to={"customers"}>Customers</Link>
            <Link className="Link" to={"customers/add"}>Add Customer</Link>
            <Link className="Link" to={"companies/coupons"}>Company Coupons</Link>
            <Link className="Link" to={"companies/coupons/add"}>Add Coupon</Link>
            <Link className="Link" to={"companies/details"}>Company Details</Link>
            <Link className="Link" to={"customers/coupons"}>Customer Coupons</Link>
            <Link className="Link" to={"customers/details"}>Customer Details</Link>
        </div>
    );
}

export default Menu;
