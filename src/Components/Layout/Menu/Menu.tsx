import { Link } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <Link className="Link" to={"home"}>Home</Link>
            <Link className="Link" to={"about"}>About</Link>
        </div>
    );
}

export default Menu;
