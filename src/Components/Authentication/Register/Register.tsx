import "./Register.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterModel } from "../../../Models/Auth";
import notificationsService from "../../../Services/NotificationsService";
import loginWebApi from "../../../Services/WebApi/LoginWebApi";
import { useNavigate } from "react-router-dom";
import { CustomerPayloadModel } from "../../../Models/Customer";

function Register(): JSX.Element {

    const navigate = useNavigate();

    const schema = yup.object().shape({

        firstName:
            yup.string()
                .required("first name is required"),
        lastName:
            yup.string()
                .required("last name is required"),
        email:
            yup.string()
                .email("Invalid email")
                .required("Email is required"),
        password:
            yup.string()
                .required("Password is required"),
        confirmPassword:
            yup.string()
                .oneOf([yup.ref('password')], 'Passwords must match')
                .required("Please Confirm Your Password"),
        profilePic:
            yup.string()
                .url("Invalid Url")
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });

    const postRegister = async (customer: CustomerPayloadModel) => {
        await loginWebApi.register(customer).then(res => {
            notificationsService.successNotification("Registered Successfully")
            navigate("/login")
        }).catch(err => {
            notificationsService.errorNotification(err.response.data.value);
        });
    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(postRegister)}>

                {(!errors.firstName) ? <label htmlFor="firstName">First Name</label> : <span>{errors.firstName.message}</span>}
                <input {...register("firstName")} id="firstName" name="firstName" type="text" placeholder="First Name" />
                {(!errors.lastName) ? <label htmlFor="lastName">Last Name</label> : <span>{errors.lastName.message}</span>}
                <input {...register("lastName")} id="lastName" name="lastName" type="text" placeholder="Last Name" />
                {(!errors.email) ? <label htmlFor="email">Email</label> : <span>{errors.email.message}</span>}
                <input {...register("email")} type="email" placeholder="Email" />
                {(!errors.password) ? <label htmlFor="password">Password</label> : <span>{errors.password.message}</span>}
                <input {...register("password")} type="password" placeholder="Password" />
                {(!errors.confirmPassword) ? <label htmlFor="confirmPassword">Confirm Password</label> : <span>{errors.confirmPassword.message}</span>}
                <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" />
                {(!errors.profilePic) ? <label htmlFor="profilePic">Profile Picture</label> : <span>{errors.profilePic.message}</span>}
                <input {...register("profilePic")} id="profilePic" name="profilePic" type="text" placeholder="URL" />
                <button disabled={!isValid}>Register</button>

            </form>
        </div>
    );
}

export default Register;
