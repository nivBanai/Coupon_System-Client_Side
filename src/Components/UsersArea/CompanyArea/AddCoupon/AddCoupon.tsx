import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import store from "../../../../Redux/Store";
import "./AddCoupon.css";
import { CouponPayloadModel } from "../../../../Models/Coupon";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import { addedCouponAction } from "../../../../Redux/AppStates/CompanyAppState";
import notificationsService from "../../../../Services/NotificationsService";
import { addedCompanyCouponAction } from "../../../../Redux/AppStates/CouponAppState";

function AddCoupon(): JSX.Element {

    const navigate = useNavigate();
    const pricePattern = /^\d+(\.\d{2,2})?$/;

    const priceValidator = yup.number()
        .required("Price is required")
        .typeError("Price is required")
        .positive("Cannot set a negative price")
        .test(
            "is-decimal",
            "The price Needs to be a decimal with a minimum and maximum of two digits after comma",
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
                .required("Category is required"),

        title: yup.string()
            .required("Title is required")
            .max(35, "Max length of a title is 35 characters"),

        description: yup.string()
            .required("Description is required")
            .max(120, "Max length of a description is 120 characters"),

        startDate: yup.date()
            .required("Start date is required")
            .typeError("Start date is required")
            .min(new Date(), "Cannot set a past date")
            .max(yup.ref("endDate"), "Start date can't be after end date"),

        endDate: yup.date()
            .default(new Date())
            .required("End date is required")
            .typeError("End date is required")
            .min(yup.ref("startDate"), "End date can't be before start date"),

        amount: yup.number()
            .required("Amount is required")
            .typeError("Amount is required")
            .positive("Cannot set a negative amount"),

        price:
            priceValidator,

        image: yup.string()
            .url("Invalid Url")
    });

    const { register, handleSubmit, clearErrors, watch, formState: { errors, isValid } } =
        useForm<CouponPayloadModel>({ mode: "all", resolver: yupResolver(schema) });

    const endDate = watch("endDate");
    const startDate = watch("startDate");

    useEffect(() => {
        const startDateCheck = new Date(startDate);
        if (startDate && startDateCheck > new Date() && new Date(endDate) > startDateCheck) {
            clearErrors("startDate")
        };
    }, [endDate, startDate]);


    const postCoupon = async (coupon: CouponPayloadModel) => {
        await companyWebApi.addCoupon(coupon)
            .then(res => {
                store.dispatch(addedCouponAction(res.data));
                store.dispatch(addedCompanyCouponAction(res.data));
                navigate("/companies/coupons");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            });
    };


    return (
        <div className="AddCoupon">

            <form onSubmit={handleSubmit(postCoupon)}>

                <h1 className="PageTitles">Add Coupon</h1>

                {(!errors.category) ? <label className="XLargeTxt" htmlFor="category">Category</label> : <span className="ErrorSpan XLargeTxt">{errors.category.message}</span>}
                <select {...register("category")} className="AddFormInput" id="category" defaultValue={""} >
                    <option disabled value={""}>Category</option>
                    <option value={"CINEMA"}>Cinema</option>
                    <option value={"FOOD"}>Food</option>
                    <option value={"SPORTS_GEAR"}>Sports Gear</option>
                    <option value={"TRADING_CARDS"}>Trading Cards</option>
                    <option value={"VIDEO_GAMES"}>Video Games</option>
                </select>

                {(!errors.title) ? <label className="XLargeTxt" htmlFor="title">Title</label> : <span className="ErrorSpan XLargeTxt">{errors.title?.message}</span>}
                <input {...register("title")} className="AddFormInput" id="title" name="title" type="text" placeholder="Title" />

                {(!errors.description) ? <label className="XLargeTxt" htmlFor="description">Description</label> : <span className="ErrorSpan XLargeTxt">{errors.description?.message}</span>}
                <input {...register("description")} className="AddFormInput" id="description" name="description" type="text" placeholder="Description" />

                {(!errors.startDate) ? <label className="XLargeTxt" htmlFor="startDate">Start Date</label> : <span className="ErrorSpan XLargeTxt">{errors.startDate?.message}</span>}
                <input {...register("startDate")} className="AddFormInput" id="startDate" name="startDate" type="date" />

                {(!errors.endDate) ? <label className="XLargeTxt" htmlFor="endDate">End Date</label> : <span className="ErrorSpan XLargeTxt">{errors.endDate?.message}</span>}
                <input {...register("endDate")} className="AddFormInput" id="endDate" name="endDate" type="date" />

                {(!errors.amount) ? <label className="XLargeTxt" htmlFor="amount">Amount</label> : <span className="ErrorSpan XLargeTxt">{errors.amount?.message}</span>}
                <input {...register("amount")} className="AddFormInput" id="amount" name="amount" type="number" placeholder="Amount" />

                {(!errors.price) ? <label className="XLargeTxt" htmlFor="price">Price</label> : <span className="ErrorSpan XLargeTxt">{errors.price?.message}</span>}
                <input {...register("price")} className="AddFormInput" id="price" name="price" type="number" step=".01" placeholder="Price" />

                {(!errors.image) ? <label className="XLargeTxt" htmlFor="image">Image</label> : <span className="ErrorSpan XLargeTxt">{errors.image?.message}</span>}
                <input {...register("image")} className="AddFormInput" id="image" name="image" type="url" placeholder="URL" />

                <button className="AddFormButton" disabled={!isValid}>Add Coupon</button>

            </form>
        </div>
    );
}

export default AddCoupon;
