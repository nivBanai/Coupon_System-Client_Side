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
                .required("name is required"),
        email:
            yup.string()
                .email("Invalid email pattern")
                .required("email is required"),
        password:
            yup.string()
                .required("password is required")
                .min(5, "Password must be at least 5 characters")

    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CompanyPayloadModel>({ mode: "all", resolver: yupResolver(schema) });


    const postCompany = async (company: CompanyPayloadModel) => {
        await adminWebApi.addCompany(company)
            .then(res => {
                store.dispatch(addedCompanyAction(res.data));
                navigate("/companies");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="AddCompany">
            <form onSubmit={handleSubmit(postCompany)}>

                {(errors.name) ? <span>{errors.name?.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} id="name" name="name" type="text" placeholder="Name" />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email" />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password" />
                <button disabled={!isValid}>Add Company</button>

            </form>
        </div>
    );
}

export default AddCompany;
