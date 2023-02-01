import "./Login.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginModel } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import { loggedIn } from "../../../Redux/AppStates/UserAppState";
import loginWebApi from "../../../Services/WebApi/LoginWebApi";
import { useNavigate } from "react-router-dom";

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

    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const postLogin = async (obj: LoginModel) => {
        const credentials = { email: obj.email, password: obj.password, clientType: obj.clientType };
        await loginWebApi.login(credentials).then(res => {
            
            store.dispatch(loggedIn(res.data));

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
        }).catch(err => console.log(err));
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(postLogin)}>
                {(!errors.clientType) ? <label htmlFor="clientType">Client</label> : <span>{errors.clientType.message}</span>}
                <select {...register("clientType")} id="clientType" defaultValue={""} >
                    <option disabled value={""}>Client</option>
                    <option value={"ADMINISTRATOR"}>Admin</option>
                    <option value={"COMPANY"}>Company</option>
                    <option value={"CUSTOMER"}>Customer</option>
                </select>
                {(!errors.email) ? <label htmlFor="email">Email</label> : <span>{errors.email.message}</span>}
                <input {...register("email")} type="email" placeholder="Email" />
                {(!errors.password) ? <label htmlFor="password">Password</label> : <span>{errors.password.message}</span>}
                <input {...register("password")} type="password" placeholder="Password" />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
