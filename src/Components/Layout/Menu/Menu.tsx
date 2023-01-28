import { Link } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <Link className="Link" to={"home"}>Home</Link>
            <Link className="Link" to={"about"}>About</Link>
            <Link className="Link" to={"companies"}>Companies</Link>
            <Link className="Link" to={"companies/add"}>Add Company</Link>
            <Link className="Link" to={"customers"}>Customers</Link>
            <Link className="Link" to={"customers/add"}>Add Customer</Link>
        </div>
    );
}

export default Menu;
