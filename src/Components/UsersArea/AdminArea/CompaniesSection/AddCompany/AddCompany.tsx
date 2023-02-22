import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CompanyPayloadModel } from "../../../../../Models/Company";
import store from "../../../../../Redux/Store";
import "./AddCompany.css";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import { addedCompanyAction } from "../../../../../Redux/AppStates/AdminAppState";
import notificationsService from "../../../../../Services/NotificationsService";

function AddCompany(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        if (!store.getState().userReducer.user.token) {
            navigate("/login");
        }
    }, []);

    const schema = yup.object().shape({
        name:
            yup.string()
                .required("Name is required"),

        email:
            yup.string()
                .email("Invalid email pattern")
                .required("Email is required"),

        password:
            yup.string()
                .required("Password is required")
                .min(5, "Password must contain a minimum of 5 characters"),

        profilePic:
            yup.string()
                .url("Invalid Url")
    });

    const { register, handleSubmit, formState: { errors, isValid } } =
        useForm<CompanyPayloadModel>({ mode: "all", resolver: yupResolver(schema) });


    const postCompany = async (company: CompanyPayloadModel) => {
        await adminWebApi.addCompany(company)
            .then(res => {
                store.dispatch(addedCompanyAction(res.data));
                navigate("/companies");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            });
    };

    return (
        <div className="AddCompany FlexColPage">

            <form onSubmit={handleSubmit(postCompany)}>

                <h1 className="PageTitles">Add Company</h1>

                {(!errors.name) ? <label className="XLargeTxt" htmlFor="name">Name</label> : <span className="ErrorSpan XLargeTxt">{errors.name?.message}</span>}
                <input {...register("name")} className="AddFormInput" id="name" name="name" type="text" placeholder="Name" />

                {(!errors.email) ? <label className="XLargeTxt" htmlFor="email">Email</label> : <span className="ErrorSpan XLargeTxt">{errors.email?.message}</span>}
                <input {...register("email")} className="AddFormInput" id="email" name="email" type="email" placeholder="Email" />

                {(!errors.password) ? <label className="XLargeTxt" htmlFor="password">Password</label> : <span className="ErrorSpan XLargeTxt">{errors.password?.message}</span>}
                <input {...register("password")} className="AddFormInput" id="password" name="password" type="password" placeholder="Password" />

                {(!errors.profilePic) ? <label className="XLargeTxt" htmlFor="profilePic">Profile Picture</label> : <span className="ErrorSpan XLargeTxt">{errors.profilePic?.message}</span>}
                <input {...register("profilePic")} className="AddFormInput" id="profilePic" name="profilePic" type="text" placeholder="URL" />

                <button className="AddFormButton" disabled={!isValid}>Add Company</button>

            </form>
        </div>
    );
}

export default AddCompany;
