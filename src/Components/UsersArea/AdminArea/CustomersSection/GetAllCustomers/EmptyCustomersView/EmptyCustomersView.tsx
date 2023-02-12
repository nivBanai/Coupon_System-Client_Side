import { useNavigate } from "react-router-dom";
import "./EmptyCustomersView.css";

function EmptyCustomersView(): JSX.Element {

    const navigate = useNavigate();

    const addCustomer = () => {
        navigate("add");
    }

    return (
        <div className="EmptyCustomersView">
			<h1>There Are No Companies Currently</h1>
            <div id="addCouponButtonContainer">
                <button id="addCouponButton" onClick={() => addCustomer()}>Add Customer</button>
            </div>
        </div>
    );
}

export default EmptyCustomersView;
