import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActiveUser } from "../../../../Models/Auth";
import { CompanyModel } from "../../../../Models/Company";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import "./GetCompanyDetails.css";

function GetCompanyDetails(): JSX.Element {

    const navigate = useNavigate();
    const [company, setCompany] = useState<CompanyModel>();
    const [user, setUser] = useState<ActiveUser>(store.getState().userReducer.user);

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
            <div className="CardContainer">
                <img className="ProfilePic" src={(user.profilePic) ? user.profilePic : "https://i1.sndcdn.com/avatars-000737858602-z63nw0-t500x500.jpg"} />
                <div className="TextContainer">
                    <h1 >{company?.name}</h1>
                    <p className="Email">{company?.email}</p>
                </div>
            </div>
        </div>
    );
}

export default GetCompanyDetails;
