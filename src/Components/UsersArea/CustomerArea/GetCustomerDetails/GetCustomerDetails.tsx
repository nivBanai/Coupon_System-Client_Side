import { useState, useEffect } from "react";
import { CustomerModel } from "../../../../Models/Customer";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import customerWebApi from "../../../../Services/WebApi/CustomerWebApi";
import "./GetCustomerDetails.css";

function GetCustomerDetails(): JSX.Element {

    const [customer, setCustomer] = useState<CustomerModel>();
    const user = store.getState().userReducer.user;

    useEffect(() => {

        if (!customer) {
            customerWebApi.getCustomerDetails()
                .then(res => {
                    setCustomer(res.data);
                })
                .catch(err => notificationsService.errorNotification(err.response.data.message));
        }
    }, []);

    return (
        <div className="GetCustomerDetails FlexColPage">

            <h1 className="ProfileTitle">Profile</h1>

            <div className="ProfileCardContainer">
                <img className="ProfilePic" src={(user.profilePic) ? user.profilePic : "https://i1.sndcdn.com/avatars-000737858602-z63nw0-t500x500.jpg"} />

                <div className="ProfileTextContainer">
                    <h1 >{customer?.firstName} {customer?.lastName}</h1>
                    <p className="ProfileEmail">{customer?.email}</p>
                </div>

            </div>

        </div >
    );
}

export default GetCustomerDetails;
