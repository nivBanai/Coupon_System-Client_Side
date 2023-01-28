import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CompanyPayloadModel } from "../../../../../Models/Company";
import { addedCompanyAction, addedCustomerAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./AddCustomer.css";
import { CustomerPayloadModel } from "../../../../../Models/Customer";

function AddCustomer(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        if (!store.getState().userReducer.user.token) {
            navigate("/login");
        }
    }, []);

    const schema = yup.object().shape({
        firstName:
            yup.string()
                .required("first name is required"),
        lastName:
            yup.string()
                .required("last name is required"),
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
        useForm<CustomerPayloadModel>({ mode: "all", resolver: yupResolver(schema) });


    const postCustomer = async (customer: CustomerPayloadModel) => {
        await adminWebApi.addCustomer(customer)
            .then(res => {
                store.dispatch(addedCustomerAction(res.data));
                navigate("/customers");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="AddCustomer">
            <form onSubmit={handleSubmit(postCustomer)}>

                {(errors.firstName) ? <span>{errors.firstName?.message}</span> : <label htmlFor="firstName">First Name</label>}
                <input {...register("firstName")} id="firstName" name="firstName" type="text" placeholder="First Name" />
                {(errors.lastName) ? <span>{errors.lastName?.message}</span> : <label htmlFor="lastName">Last Name</label>}
                <input {...register("lastName")} id="lastName" name="lastName" type="text" placeholder="Last Name" />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email" />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password" />
                <button disabled={!isValid}>Add Customer</button>

            </form>
        </div>
    );
}

export default AddCustomer;
