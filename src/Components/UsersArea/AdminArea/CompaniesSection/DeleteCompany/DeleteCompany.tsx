import { useNavigate, useParams } from "react-router-dom";
import { deletedCompanyAction } from "../../../../../Redux/AppStates/AdminAppState";
import { deletedCompanyCouponsAction } from "../../../../../Redux/AppStates/CouponAppState";
import store from "../../../../../Redux/Store";
import notificationsService from "../../../../../Services/NotificationsService";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const company = store.getState().adminReducer.companies.filter(comp => comp.id === id)[0];

    const confirm = async () => {
        await adminWebApi.deleteCompany(id)
            .then(() => {
                store.dispatch(deletedCompanyAction(id));
                store.dispatch(deletedCompanyCouponsAction(company.coupons))
                navigate("/companies");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.message);
            });
    };

    const cancel = async () => {
        navigate("/companies");
    };

    return (
        <div className="DeleteCompany FlexColPage">

            <div className="DeleteValidationContainer">

                <h2>Delete Company #{company.id} - {company.name} ?</h2>

                <div className="DecisionButtonContainer">
                    <button className="DecisionButton CancelButton" onClick={cancel}>Cancel</button>
                    <button className="DecisionButton ConfirmButton" onClick={confirm}>Confirm</button>
                </div>
            </div>

        </div>
    );
}

export default DeleteCompany;
