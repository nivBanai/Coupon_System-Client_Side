import { useEffect } from "react";
import store from "../../../Redux/Store";
import "./Home.css";

function Home(): JSX.Element {


    useEffect(() => {

        console.log(store.getState().userReducer.user.clientType);
        console.log(store.getState().userReducer.user.name);
    }, [])

    return (
        <div className="Home">
            Home
        </div>
    );
}

export default Home;
