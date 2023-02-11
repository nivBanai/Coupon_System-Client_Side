import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActiveUser, User } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<ActiveUser>(store.getState().userReducer.user);
    const [showMenu, setShowMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const isValidAdmin = (): boolean => {
        return (user.token && user.clientType === "ADMINISTRATOR") ? true : false;
    };
    const isValidCompany = (): boolean => {
        return (user.token && user.clientType === "COMPANY") ? true : false;
    };
    const isValidCustomer = (): boolean => {
        return (user.token && user.clientType === "CUSTOMER") ? true : false;
    };

    const hideMenu = () => {
        setShowMenu(false);
    }

    useEffect(() => {
        return store.subscribe(() => setUser(store.getState().userReducer.user));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {

            if (!showMenu) return;
            if (ref.current && !ref.current.contains(event.target as Node)) {
                console.log("boiiiiiiiiiiiiiiii");
                console.log(showMenu);
                hideMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, showMenu, setShowMenu]);

    return (
        <div className="AuthMenu">
            <h2 >Hello, {(user.token) ? user.name : "Guest"}</h2>
            <div ref={ref}>
                <button className="DropdownButton" onClick={() => setShowMenu(!showMenu)}>
                    <img src={(user.token && user.profilePic) ? user.profilePic : "https://i1.sndcdn.com/avatars-000737858602-z63nw0-t500x500.jpg"} alt="" />
                </button>
                {showMenu && (
                    <ul className="DropdownMenu" >
                        {
                            (isValidAdmin()) ?
                                <>
                                    <li>
                                        <Link to={"/logout"} onClick={hideMenu}>Logout</Link>
                                    </li>
                                </>
                                :
                                (isValidCompany()) ?
                                    <>
                                        <li>
                                            <Link to={"/companies/profile"} onClick={hideMenu} >Profile</Link>
                                        </li>
                                        <li>
                                            <Link to={"/logout"} onClick={hideMenu}>Logout</Link>
                                        </li>
                                    </>
                                    : (isValidCustomer()) ?
                                        <>
                                            <li>
                                                <Link to={"/customers/profile"} onClick={hideMenu}>Profile</Link>
                                            </li>
                                            <li>
                                                <Link to={"/logout"} onClick={hideMenu}>Logout</Link>
                                            </li>
                                        </>
                                        : <>
                                            <li>
                                                <Link to={"/login"} onClick={hideMenu}>Login</Link>
                                            </li>
                                            <li>
                                                <Link to={"/register"} onClick={hideMenu}>Register</Link>
                                            </li>

                                        </>}

                    </ul>
                )}
            </div>
            {/* <div>
                {(user.token) ?
                    <><Link to="logout">Logout</Link></> :
                    <><p><Link to="login">Login </Link> || <Link to="register">Register</Link></p></>}
            </div> */}
        </div >
    );
}

export default AuthMenu;
