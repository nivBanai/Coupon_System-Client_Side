import { useParams, useNavigate } from "react-router-dom";
import { deletedCouponAction } from "../../../../Redux/AppStates/CompanyAppState";
import { deletedCompanyCouponAction } from "../../../../Redux/AppStates/CouponAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const coupon = store.getState().companyReducer.coupons.filter(coup => coup.id === id)[0];

    const confirm = async () => {
        companyWebApi.deleteCoupon(id)
            .then(() => {
                store.dispatch(deletedCouponAction(id));
                store.dispatch(deletedCompanyCouponAction(id));
                navigate("/companies/coupons");
            })
            .catch(err => {
                notificationsService.errorNotification(err.response.data.message);
            })
    }

    const cancel = async () => {
        navigate("/companies/coupons");
    }

    return (
        <div className="DeleteCoupon">
            <div id="deleteValidationContainer">
                <h2>Delete Coupon #{store.getState().companyReducer.coupons.indexOf(coupon) + 1} ({coupon.title}) ?</h2>
                <div className="DecisionButtonContainer">
                    <button className="decisionButton cancelButton" onClick={cancel}>Cancel</button>
                    <button className="decisionButton confirmButton" onClick={confirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCoupon;
