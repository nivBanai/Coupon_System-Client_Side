import { useParams, useNavigate } from "react-router-dom";
import { deletedCompanyAction, deletedCustomerAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0);
    const customer = store.getState().adminReducer.customers.filter(cus => cus.id === id)[0];
    const navigate = useNavigate();

    const confirm = async () => {
        adminWebApi.deleteCustomer(id)
            .then(() => {
                store.dispatch(deletedCustomerAction(id));
                navigate("/customers");
            })
            .catch(err => {
                console.log(err);
            })
    }

    const cancel = async () => {
        navigate("/customers");
    }

    return (
        <div className="DeleteCustomer">
			<div>
                <p>Are you sure you want to delete customer #{id} ({customer.firstName} {customer.lastName})?</p>
            </div>
            <div>
                <button onClick={cancel}>Cancel</button>
                <button onClick={confirm}>Confirm</button>
            </div>
        </div>
    );
}

export default DeleteCustomer;
