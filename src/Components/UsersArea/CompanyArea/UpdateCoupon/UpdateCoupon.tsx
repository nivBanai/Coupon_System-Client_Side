import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { CouponModel, CouponPayloadModel } from "../../../../Models/Coupon";
import { updatedCouponAction } from "../../../../Redux/AppStates/CompanyAppState";
import { updatedCompanyCouponAction } from "../../../../Redux/AppStates/CouponAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import "./UpdateCoupon.css";

function UpdateCoupon(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0)
    const coupToUpdate = store.getState().companyReducer.coupons.filter(coup => coup.id === id)[0]
    const obj = coupToUpdate;
    let defaultValuesObj = { ...obj };
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
        );

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

        endDate: yup.date()
            .default(new Date())
            .required("End date is required")
            .typeError("End date is required")
            .min(new Date(), "Cannot set a past date"),

        amount: yup.number()
            .required("Amount is required")
            .typeError("Amount is required")
            .positive("Cannot set a negative amount"),

        price:
            priceValidator,

        image: yup.string()
            .url("Invalid Url")
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const putCoupon = async (coupon: CouponPayloadModel) => {
        await companyWebApi.updateCoupon(id, coupon)
            .then(res => {
                store.dispatch(updatedCouponAction(res.data));
                store.dispatch(updatedCompanyCouponAction(res.data));
                navigate("/companies/coupons");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.value);
            });
    };

    return (
        <div className="UpdateCoupon">

            <form onSubmit={handleSubmit(putCoupon)}>

                <h1 className="PageTitles">Update Coupon</h1>

                <label className="XLargeTxt" htmlFor="id">Id</label>
                <input className="UpdateFormInput" disabled id="id" name="id" type="number" value={id} />

                {(!errors.category) ? <label className="XLargeTxt" htmlFor="category">Category</label> : <span className="ErrorSpan XLargeTxt">{errors.category.message}</span>}
                <select {...register("category")} className="UpdateFormInput" id="category" defaultValue={""} >
                    <option disabled value={""}>Category</option>
                    <option value={"CINEMA"}>Cinema</option>
                    <option value={"FOOD"}>Food</option>
                    <option value={"SPORTS_GEAR"}>Sports Gear</option>
                    <option value={"TRADING_CARDS"}>Trading Cards</option>
                    <option value={"VIDEO_GAMES"}>Video Games</option>
                </select>

                {(!errors.title) ? <label className="XLargeTxt" htmlFor="title">Title</label> : <span className="ErrorSpan XLargeTxt">{errors.title?.message}</span>}
                <input {...register("title")} className="UpdateFormInput" id="title" name="title" type="text" placeholder="Title" />

                {(!errors.description) ? <label className="XLargeTxt" htmlFor="description">Description</label> : <span className="ErrorSpan XLargeTxt">{errors.description?.message}</span>}
                <input {...register("description")} className="UpdateFormInput" id="description" name="description" type="text" placeholder="Description" />

                <label className="XLargeTxt" htmlFor="startDate">Start Date</label>
                <input disabled className="UpdateFormInput" id="startDate" name="startDate" type="date" value={obj.startDate} />

                {(!errors.endDate) ? <label className="XLargeTxt" htmlFor="endDate">End Date</label> : <span className="ErrorSpan XLargeTxt">{errors.endDate?.message}</span>}
                <input {...register("endDate")} className="UpdateFormInput" id="endDate" name="endDate" type="date" />

                {(!errors.amount) ? <label className="XLargeTxt" htmlFor="amount">Amount</label> : <span className="ErrorSpan XLargeTxt">{errors.amount?.message}</span>}
                <input {...register("amount")} className="UpdateFormInput" id="amount" name="amount" type="number" placeholder="Amount" />

                {(!errors.price) ? <label className="XLargeTxt" htmlFor="price">Price</label> : <span className="ErrorSpan XLargeTxt">{errors.price?.message}</span>}
                <input {...register("price")} className="UpdateFormInput" id="price" name="price" type="number" step=".01" placeholder="Price" />

                {(!errors.image) ? <label className="XLargeTxt" htmlFor="image">Image</label> : <span className="ErrorSpan XLargeTxt">{errors.image?.message}</span>}
                <input {...register("image")} className="UpdateFormInput" id="image" name="image" type="url" placeholder="URL" />

                <button className="UpdateFormButton" disabled={!isValid || !isDirty}>Update Coupon</button>

            </form>
        </div>
    );
}

export default UpdateCoupon;
