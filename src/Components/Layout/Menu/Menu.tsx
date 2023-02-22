import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../Redux/Store";
import "./Menu.css";

function Menu(): JSX.Element {

    const [userClientType, setUserClientType] = useState(store.getState().userReducer.user.clientType);

    useEffect(() => {

        return store.subscribe(() => {
            setUserClientType(store.getState().userReducer.user.clientType);
        });
    },
        []);

    return (

        <div className="Menu">

            <Link to={"home"}>Home</Link>

            <Link to={"about"}>About</Link>

            <Link to={"coupons"}>Coupons</Link>

            {userClientType === "ADMINISTRATOR" &&
                (
                    <>
                        <Link to={"companies"}>Companies</Link>

                        <Link to={"customers"}>Customers</Link>
                    </>
                )
            }

            {userClientType === "COMPANY" &&
                (<Link to={"companies/coupons"}>My Coupons</Link>)
            }

            {userClientType === "CUSTOMER" &&
                (<Link to={"customers/coupons"}>My Coupons</Link>)
            }

        </div>
    );
}

export default Menu;
