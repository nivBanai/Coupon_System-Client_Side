import { useParams, useNavigate } from "react-router-dom";
import { deletedCompanyAction, deletedCustomerAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import notificationsService from "../../../../../Services/NotificationsService";
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
                notificationsService.errorNotification(err.response.data.message);
            })
    }

    const cancel = async () => {
        navigate("/customers");
    }

    return (
        <div className="DeleteCustomer">
            <div id="deleteValidationContainer">
                <h2>Delete Company #{customer.id} - {customer.lastName} {customer.firstName} ?</h2>
                <div className="DecisionButtonContainer">
                    <button className="decisionButton cancelButton" onClick={cancel}>Cancel</button>
                    <button className="decisionButton confirmButton" onClick={confirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCustomer;
