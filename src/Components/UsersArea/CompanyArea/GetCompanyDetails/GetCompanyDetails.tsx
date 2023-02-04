import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/Company";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import "./GetCompanyDetails.css";

function GetCompanyDetails(): JSX.Element {

    const navigate = useNavigate();
    // const initialCompany:CompanyModel = {
    //     id: 0,
    //     name: "",
    //     email: "",
    //     password: "",
    //     coupons: []
    // };
    const [company, setCompany] = useState<CompanyModel>();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;

        if (!token) {
            navigate("/login");
        }
        else if (!company) {
            companyWebApi.getCompanyDetails()
                .then(res => {
                    // Update local state
                    setCompany(res.data);

                    // Update app state

                    // store.dispatch(gotAllCompaniesAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => 
                    notificationsService.errorNotification(err.response.data.message));
        }
    }, []);

    return (
        <div className="GetCompanyDetails">
            <p>{company?.name}</p>
            <p>{company?.email}</p>
            <p>{company?.password}</p>
        </div>
    );
}

export default GetCompanyDetails;
