import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/Company";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCompaniesAction } from "../../../../Redux/AppStates/AdminAppState";
import { gotAllCouponsAction } from "../../../../Redux/AppStates/CompanyAppState";
import store from "../../../../Redux/Store";
import adminWebApi from "../../../../Services/WebApi/AdminWebApi";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import "./GetCompanyCoupons.css";

function GetCompanyCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);

    const deleteCoupon = (id: number) => {
        navigate("delete/" + id);
    }

    const updateCoupon = (id: number) => {
        navigate("update/" + id);
    }

    useEffect(() => {

        if (!store.getState().userReducer.user.token) {
            navigate("/login");
        }
        else if (coupons.length === 0) {
            companyWebApi.getAllCoupons()
                .then(res => {
                    // Update local state
                    setCoupons(res.data);

                    // Update app state

                    store.dispatch(gotAllCouponsAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => console.log(err));
        }
    }, []);

    return (
        <div className="GetCompanyCoupons">
            {
                (coupons?.length > 0) ?
                    <>{coupons.map((coup, idx) =>
                        <div key={idx}>
                            <span>{coup.id}</span>
                            <span>{coup.category}</span>
                            <span>{coup.title}</span>
                            <span>{coup.description}</span>
                            <span>{coup.startDate}</span>
                            <span>{coup.endDate}</span>
                            <span>{coup.amount}</span>
                            <span>{coup.price}</span>
                            <span>{coup.image}</span>
                        </div>
                    )}</>

                    : <div></div>
            }

        </div>
    );
}

export default GetCompanyCoupons;
