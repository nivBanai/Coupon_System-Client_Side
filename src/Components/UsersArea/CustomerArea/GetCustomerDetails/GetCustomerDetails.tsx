import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "redux";
import { ActiveUser } from "../../../../Models/Auth";
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
    const [user, setUser] = useState<ActiveUser>(store.getState().userReducer.user);

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
            <h1 className="ProfileTitle">Profile</h1>
            <div className="CardContainer">
                <img className="ProfilePic" src={(user.profilePic) ? user.profilePic : "https://i1.sndcdn.com/avatars-000737858602-z63nw0-t500x500.jpg"} />
                <div className="TextContainer">
                    <h1 >{customer?.firstName} {customer?.lastName}</h1>
                    <p className="Email">{customer?.email}</p>
                </div>
            </div>
        </div >
    );
}

export default GetCustomerDetails;
