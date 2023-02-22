import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel, CustomerPayloadModel } from "../../../../../Models/Customer";
import { updatedCustomerAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./UpdateCustomer.css";
import notificationsService from "../../../../../Services/NotificationsService";

function UpdateCustomer(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0)
    const cusToUpdate = store.getState().adminReducer.customers.filter(cus => cus.id === id)[0]
    const obj = cusToUpdate;
    let defaultValuesObj = { ...obj };

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

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const putCustomer = async (customer: CustomerPayloadModel) => {
        await adminWebApi.updateCustomer(id, customer)
            .then(res => {
                store.dispatch(updatedCustomerAction(res.data))
                navigate("/customers");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            });
    };

    return (
        <div className="UpdateCustomer">

            <form onSubmit={handleSubmit(putCustomer)}>

                <h1 className="PageTitles">Update Customer</h1>

                <label className="XLargeTxt" htmlFor="id">Id</label>
                <input className="UpdateFormInput" disabled id="id" name="id" type="number" value={id} />

                {(!errors.firstName) ? <label className="XLargeTxt" htmlFor="firstName">First Name</label> : <span className="ErrorSpan XLargeTxt">{errors.firstName?.message}</span>}
                <input {...register("firstName")} className="UpdateFormInput" id="firstName" name="firstName" type="text" placeholder="First Name" />

                {(!errors.lastName) ? <label className="XLargeTxt" htmlFor="lastName">Last Name</label> : <span className="ErrorSpan XLargeTxt">{errors.lastName?.message}</span>}
                <input {...register("lastName")} className="UpdateFormInput" id="lastName" name="lastName" type="text" placeholder="Last Name" />

                {(!errors.email) ? <label className="XLargeTxt" htmlFor="email">Email</label> : <span className="ErrorSpan XLargeTxt">{errors.email?.message}</span>}
                <input {...register("email")} className="UpdateFormInput" id="email" name="email" type="email" placeholder="Email" />

                {(!errors.password) ? <label className="XLargeTxt" htmlFor="password">Password</label> : <span className="ErrorSpan XLargeTxt">{errors.password?.message}</span>}
                <input {...register("password")} className="UpdateFormInput" id="password" name="password" type="password" placeholder="Password" />

                {(!errors.profilePic) ? <label className="XLargeTxt" htmlFor="profilePic">Profile Picture</label> : <span className="ErrorSpan XLargeTxt">{errors.profilePic?.message}</span>}
                <input {...register("profilePic")} className="UpdateFormInput" id="profilePic" name="profilePic" type="text" placeholder="URL" />
                
                <button className="UpdateFormButton" disabled={!isValid || !isDirty}>Update Customer</button>

            </form>
            
        </div>
    );
}

export default UpdateCustomer;
