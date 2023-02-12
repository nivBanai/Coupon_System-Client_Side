import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CompanyPayloadModel } from "../../../../Models/Company";
import { addedCompanyAction } from "../../../../Redux/AppStates/AdminAppState";
import store from "../../../../Redux/Store";
import adminWebApi from "../../../../Services/WebApi/AdminWebApi";
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

        startDate: yup.date()
            .required("start date is required")
            .typeError("start date is required")
            .min(new Date(), "cannot set a past date")
            .max(yup.ref("endDate"), "start date can't be after end date"),

        endDate: yup.date()
            .default(new Date())
            .required("end date is required")
            .typeError("end date is required")
            .min(yup.ref("startDate"), "end date can't be before start date"),

        amount: yup.number()
            .required("amount is required")
            .typeError("amount is required")
            .positive("Cannot set a negative amount"),

        price:
            priceValidator,

        image: yup.string()
            .url("Invalid Url")
    });

    const { register, handleSubmit, clearErrors, watch, formState: { errors, isDirty, isValid } } =
        useForm<CouponPayloadModel>({ mode: "all", resolver: yupResolver(schema) });

    const endDate = watch("endDate");
    const startDate = watch("startDate");

    useEffect(() => {
        const startDateCheck = new Date(startDate);
        if (startDate && startDateCheck > new Date() && new Date(endDate) > startDateCheck) {
            clearErrors("startDate")
        }
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
            })
    }


    return (
        <div className="AddCoupon">
            <form onSubmit={handleSubmit(postCoupon)}>

            <h1 className="PageTitles">Add Coupon</h1>

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

                {(errors.startDate) ? <span>{errors.startDate?.message}</span> : <label htmlFor="startDate">Start Date</label>}
                <input {...register("startDate")} id="startDate" name="startDate" type="date" />

                {(errors.endDate) ? <span>{errors.endDate?.message}</span> : <label htmlFor="endDate">End Date</label>}
                <input {...register("endDate")} id="endDate" name="endDate" type="date" />

                {(errors.amount) ? <span>{errors.amount?.message}</span> : <label htmlFor="amount">Amount</label>}
                <input {...register("amount")} id="amount" name="amount" type="number" placeholder="Amount" />

                {(errors.price) ? <span>{errors.price?.message}</span> : <label htmlFor="price">Price</label>}
                <input {...register("price")} id="price" name="price" type="number" step=".01" placeholder="Price" />

                {(errors.image) ? <span>{errors.image?.message}</span> : <label htmlFor="image">Image</label>}
                <input {...register("image")} id="image" name="image" type="url" placeholder="URL" />

                <button disabled={!isValid}>Add Coupon</button>

            </form>
        </div>
    );
}

export default AddCoupon;
