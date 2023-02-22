import { useEffect, useState } from "react";
import { CompanyModel } from "../../../../Models/Company";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import "./GetCompanyDetails.css";

function GetCompanyDetails(): JSX.Element {

    const [company, setCompany] = useState<CompanyModel>();
    const user = store.getState().userReducer.user;

    useEffect(() => {

        if (!company) {
            companyWebApi.getCompanyDetails()
                .then(res => {
                    setCompany(res.data);
                })
                .catch(err =>
                    notificationsService.errorNotification(err.response.data.message));
        }
    }, []);

    return (
        <div className="GetCompanyDetails FlexColPage">

            <h1 className="ProfileTitle">Profile</h1>

            <div className="ProfileCardContainer">
                <img className="ProfilePic" src={(user.profilePic) ? user.profilePic : "https://i1.sndcdn.com/avatars-000737858602-z63nw0-t500x500.jpg"} />

                <div className="ProfileTextContainer">
                    <h1 >{company?.name}</h1>
                    <p className="ProfileEmail">{company?.email}</p>
                </div>

            </div>

        </div>
    );
}

export default GetCompanyDetails;
