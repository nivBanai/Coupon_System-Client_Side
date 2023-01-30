import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCustomerCouponsAction } from "../../../../Redux/AppStates/CustomerAppState";
import store from "../../../../Redux/Store";
import customerWebApi from "../../../../Services/WebApi/CustomerWebApi";
import "./GetCustomerCoupons.css";

function GetCustomerCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().customerReducer.coupons);

    useEffect(() => {

        if (!store.getState().userReducer.user.token) {
            navigate("/login");
        }
        else if (coupons.length === 0) {
            customerWebApi.getAllCustomerCoupons()
                .then(res => {
                    // Update local state
                    setCoupons(res.data);

                    // Update app state

                    store.dispatch(gotAllCustomerCouponsAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => console.log(err));
        }
    }, []);

    return (
        <div className="GetCustomerCoupons">
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
                                <li>{coup.price}</li>
                                <li><img src={coup.image} alt="N/A" /></li>
                            </ol>

                        </div>
                    )}</>

                    : <div></div>
            }
        </div>
    );
}

export default GetCustomerCoupons;
