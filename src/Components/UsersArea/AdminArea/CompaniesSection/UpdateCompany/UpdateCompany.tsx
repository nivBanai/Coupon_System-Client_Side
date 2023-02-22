import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import store from "../../../../../Redux/Store";
import "./UpdateCompany.css";
import { CompanyModel, CompanyPayloadModel } from "../../../../../Models/Company";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import { updatedCompanyAction } from "../../../../../Redux/AppStates/AdminAppState";
import notificationsService from "../../../../../Services/NotificationsService";

function UpdateCompany(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0)
    const compToUpdate = store.getState().adminReducer.companies.filter(comp => comp.id === id)[0]
    const obj = compToUpdate;
    let defaultValuesObj = { ...obj };

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

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const putCompany = async (company: CompanyPayloadModel) => {
        await adminWebApi.updateCompany(id, company)
            .then(res => {
                store.dispatch(updatedCompanyAction(res.data))
                navigate("/companies");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            });
    };

    return (
        <div className="UpdateCompany FlexColPage">

            <form onSubmit={handleSubmit(putCompany)}>

                <h1 className="PageTitles">Update Company</h1>

                <label className="XLargeTxt" htmlFor="id">Id</label>
                <input disabled className="UpdateFormInput" id="id" name="id" type="number" value={id} />

                <label className="XLargeTxt" htmlFor="name">Name</label>
                <input disabled className="UpdateFormInput" id="name" name="name" type="text" value={compToUpdate.name} />

                {(!errors.email) ? <label className="XLargeTxt" htmlFor="email">Email</label> : <span className="ErrorSpan XLargeTxt">{errors.email?.message}</span>}
                <input {...register("email")} className="UpdateFormInput" id="email" name="email" type="email" />

                {(!errors.password) ? <label className="XLargeTxt" htmlFor="password">Password</label> : <span className="ErrorSpan XLargeTxt">{errors.password?.message}</span>}
                <input {...register("password")} className="UpdateFormInput" id="password" name="password" type="password" />

                {(!errors.profilePic) ? <label className="XLargeTxt" htmlFor="profilePic">Profile Picture</label> : <span className="ErrorSpan XLargeTxt">{errors.profilePic?.message}</span>}
                <input {...register("profilePic")} className="UpdateFormInput" id="profilePic" name="profilePic" type="text" placeholder="URL" />

                <button className="UpdateFormButton" disabled={!isValid || !isDirty}>Update Company</button>

            </form>
        </div>
    );
}

export default UpdateCompany;
