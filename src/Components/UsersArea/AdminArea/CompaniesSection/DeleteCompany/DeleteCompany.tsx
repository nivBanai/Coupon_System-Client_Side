import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/Company";
import { deletedCompanyAction } from "../../../../../Redux/AppStates/AdminAppState";
import { deletedCompanyCouponsAction } from "../../../../../Redux/AppStates/CouponAppState";
import store from "../../../../../Redux/Store";
import notificationsService from "../../../../../Services/NotificationsService";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0);
    const company = store.getState().adminReducer.companies.filter(comp => comp.id === id)[0];
    const navigate = useNavigate();

    const confirm = async () => {
        adminWebApi.deleteCompany(id)
            .then(() => {
                store.dispatch(deletedCompanyAction(id));
                store.dispatch(deletedCompanyCouponsAction(company.coupons))
                navigate("/companies");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.message);
            })
    }

    const cancel = async () => {
        navigate("/companies");
    }

    return (
        <div className="DeleteCompany">
            <div>
                <p>Are you sure you want to delete {company.name} ?</p>
            </div>
            <div>
                <button onClick={cancel}>Cancel</button>
                <button onClick={confirm}>Confirm</button>
            </div>
        </div>
    );
}

export default DeleteCompany;
