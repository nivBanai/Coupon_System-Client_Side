import { Link, useNavigate } from "react-router-dom";
import AuthMenu from "../../Authentication/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">

            <div></div>
            <Link to={"/home"}>
            <h1 >Couponology</h1>
            </Link>
            <AuthMenu />
        </div>
    );
}

export default Header;
