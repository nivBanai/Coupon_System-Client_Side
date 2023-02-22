import { useNavigate } from "react-router-dom";
import "./EmptyCustomersView.css";

function EmptyCustomersView(): JSX.Element {

    const navigate = useNavigate();

    const addCustomer = () => {
        navigate("add");
    }

    return (
        <div className="EmptyCustomersView EmptyUserView">

            <h1>There Are No Customers Currently</h1>

            <div className="AddUserButtonContainer">
                <button className="AddUserButton" onClick={() => addCustomer()}>Add Customer</button>
            </div>
            
        </div>
    );
}

export default EmptyCustomersView;
