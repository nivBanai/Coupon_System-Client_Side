import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeCoupons as removeCoupons } from "../../../Redux/AppStates/CompanyAppState";
import { loggedOut } from "../../../Redux/AppStates/UserAppState";
import store from "../../../Redux/Store";
import notificationsService from "../../../Services/NotificationsService";
import loginWebApi from "../../../Services/WebApi/LoginWebApi";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        loginWebApi.logout()
            .then(() => {
                store.dispatch(loggedOut());
                store.dispatch(removeCoupons());
            })
            .catch(err => notificationsService.errorNotification(err));

        navigate("/home");
    }, []);

    return (
        <div className="Logout">

        </div>
    );
}

export default Logout;
