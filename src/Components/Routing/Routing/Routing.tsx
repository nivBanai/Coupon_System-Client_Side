import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import Login from "../../Authentication/Login/Login";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Page404 from "../../Pages/Page404/Page404";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<App/>}/>
                <Route path="home" element={<Home/>}/>
                <Route index element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
