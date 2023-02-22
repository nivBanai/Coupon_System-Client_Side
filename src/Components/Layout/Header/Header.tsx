import { Link } from "react-router-dom";
import AuthMenu from "../../Authentication/AuthMenu/AuthMenu";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
    theme: string;
    onSwitchTheme: () => void;
}

function Header(props: HeaderProps): JSX.Element {

    return (
        <div className="Header">

            <div id="themeButtonContainer">
                <button id="themeButton" onClick={props.onSwitchTheme}>{props.theme === 'dark' ? <FaRegLightbulb size={60} /> : <FaLightbulb size={60} />}</button>
            </div>

            <Link to={"/home"}>
                <h1>Savvy Super Saver</h1>
            </Link>

            <AuthMenu />

        </div>
    );
}

export default Header;
