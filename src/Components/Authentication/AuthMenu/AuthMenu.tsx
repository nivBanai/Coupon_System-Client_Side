import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<User>(store.getState().userReducer.user);

    useEffect(() => {
        return store.subscribe(() => setUser(store.getState().userReducer.user));
    }, []);
    return (
        <div className="AuthMenu row">
            {(user?.token) ?
                <><Link to="logout">Logout</Link></> :
                <><Link to="login">Login </Link></>}
        </div>
    );
}

export default AuthMenu;
