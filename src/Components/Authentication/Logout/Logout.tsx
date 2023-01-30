import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeCoupons as removeCoupons } from "../../../Redux/AppStates/CompanyAppState";
import { loggedOut } from "../../../Redux/AppStates/UserAppState";
import store from "../../../Redux/Store";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
       store.dispatch(loggedOut());
       store.dispatch(removeCoupons());
        navigate("/login");
    });

    return (
        <div className="Logout">
			
        </div>
    );
}

export default Logout;
