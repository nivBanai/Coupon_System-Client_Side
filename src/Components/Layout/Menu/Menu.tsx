import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../Redux/Store";
import "./Menu.css";

function Menu(): JSX.Element {

    const [userClientType, setUserClientType] = useState(store.getState().userReducer.user.clientType);

    useEffect(() => {
    
        return store.subscribe(() => {
            setUserClientType(store.getState().userReducer.user.clientType); // Will let us notify
        });
    },
    []);

    return (
        <div className="Menu">

            <Link className="Link" to={"home"}>Home</Link>

            <Link className="Link" to={"about"}>About</Link>

            <Link className="Link" to={"coupons"}>Coupons</Link>

            {(userClientType === "ADMINISTRATOR") ?
                <>
                    <Link className="Link" to={"companies"}>Companies</Link>

                    <Link className="Link" to={"customers"}>Customers</Link>

                </>
                : <></>}
            {(userClientType === "COMPANY") ?
                <>
                    <Link className="Link" to={"companies/coupons"}>Company Coupons</Link>

                    <Link className="Link" to={"companies/details"}>Company Details</Link>
                </>
                : <></>}
            {(userClientType === "CUSTOMER") ?
                <>
                    <Link className="Link" to={"customers/coupons"}>Customer Coupons</Link>

                    <Link className="Link" to={"customers/details"}>Customer Details</Link>
                </>
                : <></>}

        </div>
    );
}

export default Menu;
