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
    const [obj, setObj] = useState<CompanyModel>(compToUpdate);
    let defaultValuesObj = { ...obj};

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



    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } =
        useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    // const { dirtyFields } = useFormState({ control });

    const putCompany = async (company: CompanyPayloadModel) => {
        await adminWebApi.updateCompany(id, company)
            .then(res => {
                store.dispatch(updatedCompanyAction(res.data))
                navigate("/companies");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            })
    }

    return (
        <div className="UpdateCompany">
            <form onSubmit={handleSubmit(putCompany)}>
                <label htmlFor="id">Id</label>
                <input disabled id="id" name="id" type="number" value={id} />

                {(errors.name) ? <span>{errors.name?.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} id="name" name="name" type="text" placeholder="Name" />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email" />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password" />
                <button disabled={!isValid || !isDirty}>Update Company</button>

            </form>
        </div>
    );
}

export default UpdateCompany;
