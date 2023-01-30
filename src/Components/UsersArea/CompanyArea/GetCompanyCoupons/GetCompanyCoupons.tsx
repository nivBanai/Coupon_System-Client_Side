import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCompanyCouponsAction } from "../../../../Redux/AppStates/CompanyAppState";

import store from "../../../../Redux/Store";
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

                    store.dispatch(gotAllCompanyCouponsAction(res.data))

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
                            <ol>
                                <li>{coup.id}</li>
                                <li>{coup.category}</li>
                                <li>{coup.title}</li>
                                <li>{coup.description}</li>
                                <li>{coup.startDate}</li>
                                <li>{coup.endDate}</li>
                                <li>{coup.amount}</li>
                                <li>{coup.price}</li>
                                <li><img src={coup.image} alt="N/A" /></li>
                                <li>
                                    <button onClick={() => deleteCoupon(coup.id)}>Delete</button>
                                    <button onClick={() => updateCoupon(coup.id)}>Update</button>
                                </li>
                            </ol>

                        </div>
                    )}</>

                    : <div></div>
            }

        </div>
    );
}

export default GetCompanyCoupons;
