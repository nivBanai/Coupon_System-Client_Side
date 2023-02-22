import "./Register.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterModel } from "../../../Models/Auth";
import notificationsService from "../../../Services/NotificationsService";
import loginWebApi from "../../../Services/WebApi/LoginWebApi";
import { useNavigate } from "react-router-dom";
import { CustomerPayloadModel } from "../../../Models/Customer";
import { toast } from "react-toastify";

function Register(): JSX.Element {

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
                .email("Invalid email")
                .required("Email is required"),

        password:
            yup.string()
                .required("Password is required")
                .min(5, "Password must contain a minimum of 5 characters"),

        confirmPassword:
            yup.string()
                .oneOf([yup.ref('password')], "Passwords must match")
                .required("Please confirm your password"),

        profilePic:
            yup.string()
                .url("Invalid Url")
    });

    const { register, handleSubmit, formState: { errors, isValid } } =
        useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });

    const postRegister = async (customer: CustomerPayloadModel) => {

        await loginWebApi.register(customer)
            .then(() => {
                toast.success(
                    <div>Registered Successfully!<br />Please Login</div>,
                    {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });

                navigate("/login")
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            });
    };

    return (
        <div className="Register FlexColPage">

            <form onSubmit={handleSubmit(postRegister)}>

                <h1 className="PageTitles">Register</h1>

                {(!errors.firstName) ? <label className="XLargeTxt" htmlFor="firstName">First Name</label> : <span className="ErrorSpan XLargeTxt">{errors.firstName.message}</span>}
                <input {...register("firstName")} className="AuthInput AuthField" id="firstName" name="firstName" type="text" placeholder="First Name" />

                {(!errors.lastName) ? <label className="XLargeTxt" htmlFor="lastName">Last Name</label> : <span className="ErrorSpan XLargeTxt">{errors.lastName.message}</span>}
                <input {...register("lastName")} className="AuthInput AuthField" id="lastName" name="lastName" type="text" placeholder="Last Name" />

                {(!errors.email) ? <label className="XLargeTxt" htmlFor="email">Email</label> : <span className="ErrorSpan XLargeTxt">{errors.email.message}</span>}
                <input {...register("email")} className="AuthInput AuthField" type="email" placeholder="Email" />

                {(!errors.password) ? <label className="XLargeTxt" htmlFor="password">Password</label> : <span className="ErrorSpan XLargeTxt">{errors.password.message}</span>}
                <input {...register("password")} className="AuthInput AuthField" type="password" placeholder="Password" />

                {(!errors.confirmPassword) ? <label className="XLargeTxt" htmlFor="confirmPassword">Confirm Password</label> : <span className="ErrorSpan XLargeTxt">{errors.confirmPassword.message}</span>}
                <input {...register("confirmPassword")} className="AuthInput AuthField" type="password" placeholder="Confirm Password" />

                {(!errors.profilePic) ? <label className="XLargeTxt" htmlFor="profilePic">Profile Picture</label> : <span className="ErrorSpan XLargeTxt">{errors.profilePic.message}</span>}
                <input {...register("profilePic")} className="AuthInput AuthField" id="profilePic" name="profilePic" type="text" placeholder="URL" />

                <button className="AuthButton AuthField" disabled={!isValid}>Register</button>

            </form>

        </div>
    );
}

export default Register;
