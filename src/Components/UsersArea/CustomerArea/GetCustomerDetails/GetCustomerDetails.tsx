import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/Company";
import { CustomerModel } from "../../../../Models/Customer";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import customerWebApi from "../../../../Services/WebApi/CustomerWebApi";
import "./GetCustomerDetails.css";

function GetCustomerDetails(): JSX.Element {

    const navigate = useNavigate();
    // const initialCompany:CompanyModel = {
    //     id: 0,
    //     name: "",
    //     email: "",
    //     password: "",
    //     coupons: []
    // };
    const [customer, setCustomer] = useState<CustomerModel>();

    useEffect(() => {
        const token = store.getState().userReducer.user.token;

        if (!token) {
            navigate("/login");
        }
        else if (!customer) {
            customerWebApi.getCustomerDetails()
                .then(res => {
                    // Update local state
                    setCustomer(res.data);

                    // Update app state

                    // store.dispatch(gotAllCompaniesAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => notificationsService.errorNotification(err.response.data.message));
        }
    }, []);

    return (
        <div className="GetCustomerDetails">
			<p>{customer?.firstName} {customer?.lastName}</p>
            <p>{customer?.email}</p>
            <p>{customer?.password}</p>
        </div>
    );
}

export default GetCustomerDetails;
