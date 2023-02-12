import "./Login.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ActiveUser, LoginModel } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import { loggedIn } from "../../../Redux/AppStates/UserAppState";
import loginWebApi from "../../../Services/WebApi/LoginWebApi";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import notificationsService from "../../../Services/NotificationsService";

function Login(): JSX.Element {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email:
            yup.string()
                .email("Invalid email")
                .required("Email is required"),
        password:
            yup.string()
                .required("Password is required"),
        clientType:
            yup.string()
                .required("Client type is required")
                .typeError("Client type is required")

    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const postLogin = async (obj: LoginModel) => {
        const credentials = { email: obj.email, password: obj.password, profilePic: obj.profilePic, clientType: obj.clientType };
        await loginWebApi.login(credentials).then(res => {

            const activeUser: ActiveUser = {
                token: res.data.token,
                name: res.data.name,
                profilePic: res.data.profilePic,
                clientType: obj.clientType
            }

            store.dispatch(loggedIn(activeUser));

            switch (obj.clientType) {

                case "ADMINISTRATOR":
                    navigate("/home");
                    break;

                case "COMPANY":
                    navigate("/companies/coupons");
                    break;

                case "CUSTOMER":
                    navigate("/customers/coupons");
                    break;
            }
        }).catch(err => {
            notificationsService.errorNotification(err.response.data.value);
        });
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(postLogin)}>

                <h1 className="PageTitles">Login</h1>

                {(!errors.email) ? <label htmlFor="email">Email</label> : <span>{errors.email.message}</span>}
                <input {...register("email")} className="Credentials" type="email" placeholder="Email" />
                {(!errors.password) ? <label htmlFor="password">Password</label> : <span>{errors.password.message}</span>}
                <input {...register("password")} className="Credentials" type="password" placeholder="Password" />

                <div className="ClientTypesContainer">
                    {(!errors.clientType) ? <label htmlFor="clientType">Client</label> : <span>{errors.clientType.message}</span>}
                    <div className="ClientType">
                        <label htmlFor="admin">Admin</label>
                        <input {...register("clientType")} className="ClientTypes" type="radio" id="admin" name="clientType" value="ADMINISTRATOR" />

                        <label htmlFor="company">Company</label>
                        <input {...register("clientType")} className="ClientTypes" type="radio" id="company" name="clientType" value="COMPANY" />

                        <label htmlFor="customer">Customer</label>
                        <input {...register("clientType")} className="ClientTypes" type="radio" id="customer" name="clientType" value="CUSTOMER" />
                    </div>
                </div>
                <button disabled={!isValid}>Login</button>

            </form>
        </div>
    );
}

export default Login;
