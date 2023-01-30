import { useParams, useNavigate } from "react-router-dom";
import { deletedCompanyAction } from "../../../../Redux/AppStates/AdminAppState";
import { deletedCouponAction } from "../../../../Redux/AppStates/CompanyAppState";
import store from "../../../../Redux/Store";
import adminWebApi from "../../../../Services/WebApi/AdminWebApi";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0);
    const coupon = store.getState().companyReducer.coupons.filter(coup => coup.id === id)[0];
    const navigate = useNavigate();

    const confirm = async () => {
        companyWebApi.deleteCoupon(id)
            .then(() => {
                store.dispatch(deletedCouponAction(id));
                navigate("/companies/coupons");
            })
            .catch(err => {
                console.log(err);
            })
    }

    const cancel = async () => {
        navigate("/companies/coupons");
    }

    return (
        <div className="DeleteCoupon">
            <div>
                <p>Are you sure you want to delete #{coupon.id} ({coupon.title}) ?</p>
            </div>
            <div>
                <button onClick={cancel}>Cancel</button>
                <button onClick={confirm}>Confirm</button>
            </div>
        </div>
    );
}

export default DeleteCoupon;
