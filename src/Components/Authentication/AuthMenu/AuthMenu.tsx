import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActiveUser, User } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import authUtils from "../../../Utils/AuthUtils";
import utils from "../../../Utils/StringUtils";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<ActiveUser>(store.getState().userReducer.user);
    const [showMenu, setShowMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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
                hideMenu();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, showMenu, setShowMenu]);

    return (
        <div className="AuthMenu">

            <h2 >Hello, {(authUtils.isLoggedIn(user)) ? user.name : "Guest"}</h2>

            <div ref={ref}>

                <button id="dropDownButton" onClick={() => setShowMenu(!showMenu)}>
                    <img src={(authUtils.isLoggedIn(user) && user.profilePic) ? user.profilePic : "https://i1.sndcdn.com/avatars-000737858602-z63nw0-t500x500.jpg"} alt="N/A" />
                </button>

                {showMenu && (
                    <ul id="dropDownMenu" >
                        {
                            (authUtils.isValidAdmin(user)) ?
                                <>
                                    <li>
                                        <Link to={"/logout"} onClick={hideMenu}>Logout</Link>
                                    </li>
                                </>
                                :
                                (authUtils.isValidCompany(user)) ?
                                    <>
                                        <li>
                                            <Link to={"/companies/profile"} onClick={hideMenu} >Profile</Link>
                                        </li>
                                        <li>
                                            <Link to={"/logout"} onClick={hideMenu}>Logout</Link>
                                        </li>
                                    </>
                                    : (authUtils.isValidCustomer(user)) ?
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
                                        </>
                        }
                    </ul>
                )}
            </div>

        </div >
    );
}

export default AuthMenu;
