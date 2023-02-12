import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { CompanyModel, CompanyPayloadModel } from "../../../../Models/Company";
import { CouponModel, CouponPayloadModel } from "../../../../Models/Coupon";
import { updatedCompanyAction } from "../../../../Redux/AppStates/AdminAppState";
import { updatedCouponAction } from "../../../../Redux/AppStates/CompanyAppState";
import { updatedCompanyCouponAction } from "../../../../Redux/AppStates/CouponAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import adminWebApi from "../../../../Services/WebApi/AdminWebApi";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0)
    const coupToUpdate = store.getState().companyReducer.coupons.filter(coup => coup.id === id)[0]
    // const num = store.getState().companyReducer.coupons.indexOf(coupToUpdate);
    const [obj, setObj] = useState<CouponModel>(coupToUpdate);
    let defaultValuesObj = { ...obj };
    const pricePattern = /^\d+(\.\d{2,2})?$/;

    useEffect(() => {
        if (!store.getState().userReducer.user.token) {
            navigate("/login");
        }
    }, []);

    const priceValidator = yup.number()
        .required("price is required")
        .typeError("price is required")
        .positive("Cannot set a negative price")
        .test(
            "is-decimal",
            "The price should be a decimal with a minimum and maximum of two digits after comma",
            (val: any) => {
                if (val != undefined) {
                    return pricePattern.test(val);
                }
                return true;
            }
        )

    const schema = yup.object().shape({

        category:
            yup.string()
                .required("category is required"),

        title: yup.string()
            .required("title is required"),

        description: yup.string()
            .required("description is required"),

        endDate: yup.date()
            .default(new Date())
            .required("end date is required")
            .typeError("end date is required")
            .min(new Date(), "cannot set a past date"),

        amount: yup.number()
            .required("amount is required")
            .typeError("amount is required")
            .positive("Cannot set a negative amount"),

        price:
            priceValidator,

        image: yup.string()
            .url("Invalid Url")
    });

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } } =
        useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    // const { dirtyFields } = useFormState({ control });

    const putCoupon = async (coupon: CouponPayloadModel) => {
        await companyWebApi.updateCoupon(id, coupon)
            .then(res => {
                store.dispatch(updatedCouponAction(res.data));
                store.dispatch(updatedCompanyCouponAction(res.data));
                navigate("/companies/coupons");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            })
    }

    return (
        <div className="UpdateCoupon">
            <form onSubmit={handleSubmit(putCoupon)}>
                <label htmlFor="id">Id</label>
                <input disabled id="id" name="id" type="number" value={id} />

                {(errors.category) ? <span>{errors.category.message}</span> : <label htmlFor="category">Category</label>}
                <select {...register("category")} id="category" defaultValue={""} >
                    <option disabled value={""}>Category</option>
                    <option value={"CINEMA"}>Cinema</option>
                    <option value={"FOOD"}>Food</option>
                    <option value={"SPORTS_GEAR"}>Sports Gear</option>
                    <option value={"TRADING_CARDS"}>Trading Cards</option>
                    <option value={"VIDEO_GAMES"}>Video Games</option>
                </select>
                {(errors.title) ? <span>{errors.title?.message}</span> : <label htmlFor="title">Title</label>}
                <input {...register("title",)} id="title" name="title" type="text" placeholder="Title" />
                {(errors.description) ? <span>{errors.description?.message}</span> : <label htmlFor="description">Description</label>}
                <input {...register("description")} id="description" name="description" type="text" placeholder="Description" />
                <label htmlFor="startDate">Start Date</label>
                <input disabled id="startDate" name="startDate" type="date" value={obj.startDate} />
                {(errors.endDate) ? <span>{errors.endDate?.message }</span> : <label htmlFor="endDate">End Date</label>}
                
                <input {...register("endDate")} id="endDate" name="endDate" type="date" />
                {(errors.amount) ? <span>{errors.amount?.message}</span> : <label htmlFor="amount">Amount</label>}
                <input {...register("amount")} id="amount" name="amount" type="number" placeholder="Amount" />
                {(errors.price) ? <span>{errors.price?.message}</span> : <label htmlFor="price">Price</label>}
                <input {...register("price")} id="price" name="price" type="number" step=".01" placeholder="Price" />
                {(errors.image) ? <span>{errors.image?.message}</span> : <label htmlFor="image">Image</label>}
                <input {...register("image")} id="image" name="image" type="url" placeholder="Image" />

                <button disabled={!isValid || !isDirty}>Update Coupon</button>

            </form>
        </div>
    );
}

export default UpdateCoupon;
