import { useParams, useNavigate } from "react-router-dom";
import { deletedCustomerAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import notificationsService from "../../../../../Services/NotificationsService";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const customer = store.getState().adminReducer.customers.filter(cus => cus.id === id)[0];

    const confirm = async () => {
        adminWebApi.deleteCustomer(id)
            .then(() => {
                store.dispatch(deletedCustomerAction(id));
                navigate("/customers");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.message);
            });
    };

    const cancel = async () => {
        navigate("/customers");
    };

    return (
        <div className="DeleteCustomer FlexColPage">

            <div className="DeleteValidationContainer">

                <h2>Delete Customer #{customer.id} - {customer.lastName} {customer.firstName} ?</h2>

                <div className="DecisionButtonContainer">
                    <button className="DecisionButton CancelButton" onClick={cancel}>Cancel</button>
                    <button className="DecisionButton ConfirmButton" onClick={confirm}>Confirm</button>
                </div>

            </div>

        </div>
    );
}

export default DeleteCustomer;
