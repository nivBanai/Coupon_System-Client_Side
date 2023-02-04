import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
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
    const [obj, setObj] = useState<CustomerModel>(cusToUpdate);
    let defaultValuesObj = { ...obj };

    const schema = yup.object().shape({
        firstName:
            yup.string()
                .required("name is required"),
        lastName:
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



    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } =
        useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    // const { dirtyFields } = useFormState({ control });

    const putCustomer = async (customer: CustomerPayloadModel) => {
        await adminWebApi.updateCustomer(id, customer)
            .then(res => {
                store.dispatch(updatedCustomerAction(res.data))
                navigate("/customers");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            })
    }

    return (
        <div className="UpdateCustomer">
            <form onSubmit={handleSubmit(putCustomer)}>
                <label htmlFor="id">Id</label>
                <input disabled id="id" name="id" type="number" value={id} />

                {(errors.firstName) ? <span>{errors.firstName?.message}</span> : <label htmlFor="firstName">First Name</label>}
                <input {...register("firstName")} id="firstName" name="firstName" type="text" placeholder="First Name" />
                {(errors.lastName) ? <span>{errors.lastName?.message}</span> : <label htmlFor="lastName">Last Name</label>}
                <input {...register("lastName")} id="lastName" name="lastName" type="text" placeholder="Last Name" />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email" />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password" />
                <button disabled={!isValid || !isDirty}>Update Customer</button>

            </form>
        </div>
    );
}

export default UpdateCustomer;
