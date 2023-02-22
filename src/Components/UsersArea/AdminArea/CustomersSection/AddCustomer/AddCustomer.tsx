import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addedCustomerAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./AddCustomer.css";
import { CustomerPayloadModel } from "../../../../../Models/Customer";
import notificationsService from "../../../../../Services/NotificationsService";

function AddCustomer(): JSX.Element {

    const navigate = useNavigate();

    const schema = yup.object().shape({

        firstName:
            yup.string()
                .required("First name is required"),

        lastName:
            yup.string()
                .required("Last name is required"),

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
        useForm<CustomerPayloadModel>({ mode: "all", resolver: yupResolver(schema) });

    const postCustomer = async (customer: CustomerPayloadModel) => {
        await adminWebApi.addCustomer(customer)
            .then(res => {
                store.dispatch(addedCustomerAction(res.data));
                navigate("/customers");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            });
    };

    return (
        <div className="AddCustomer FlexColPage">

            <form onSubmit={handleSubmit(postCustomer)}>

                <h1 className="PageTitles">Add Customer</h1>

                {(!errors.firstName) ? <label className="XLargeTxt" htmlFor="firstName">First Name</label> : <span className="ErrorSpan XLargeTxt">{errors.firstName?.message}</span>}
                <input {...register("firstName")} className="AddFormInput" id="firstName" name="firstName" type="text" placeholder="First Name" />

                {(!errors.lastName) ? <label className="XLargeTxt" htmlFor="lastName">Last Name</label> : <span className="ErrorSpan XLargeTxt">{errors.lastName?.message}</span>}
                <input {...register("lastName")} className="AddFormInput" id="lastName" name="lastName" type="text" placeholder="Last Name" />

                {(!errors.email) ? <label className="XLargeTxt" htmlFor="email">Email</label> : <span className="ErrorSpan XLargeTxt">{errors.email?.message}</span>}
                <input {...register("email")} className="AddFormInput" id="email" name="email" type="email" placeholder="Email" />

                {(!errors.password) ? <label className="XLargeTxt" htmlFor="password">Password</label> : <span className="ErrorSpan XLargeTxt">{errors.password?.message}</span>}
                <input {...register("password")} className="AddFormInput" id="password" name="password" type="password" placeholder="Password" />

                {(!errors.profilePic) ? <label className="XLargeTxt" htmlFor="profilePic">Profile Picture</label> : <span className="ErrorSpan XLargeTxt">{errors.profilePic?.message}</span>}
                <input {...register("profilePic")} className="AddFormInput" id="profilePic" name="profilePic" type="text" placeholder="URL" />

                <button className="AddFormButton" disabled={!isValid}>Add Customer</button>

            </form>
        </div>
    );
}

export default AddCustomer;
