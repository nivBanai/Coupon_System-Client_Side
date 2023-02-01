import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCouponsAction } from "../../../../Redux/AppStates/CouponAppState";
import { userReducer } from "../../../../Redux/AppStates/UserAppState";
import store from "../../../../Redux/Store";
import couponWebApi from "../../../../Services/WebApi/CouponWebApi";
import "./GetAllCoupons.css";

function GetAllCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [originalAllCoupons, setOriginalAllCoupons] = useState<CouponModel[]>(store.getState().couponReducer.allCoupons);
    const [allCoupons, setAllCoupons] = useState<CouponModel[]>(originalAllCoupons);
    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>(store.getState().customerReducer.coupons);

    const purchaseCoupon = (id: number) => {
        navigate("purchase/" + id);
    }

    // const fixedCategory = (category: string): string => {
    //     return category.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
    // }

    const fixedCategory =(category: string): string => {
        category = category.toLowerCase();
        return category.replace("_", " ").split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
    }

    useEffect(() => {

        if (originalAllCoupons.length === 0) {
            couponWebApi.getAllCoupons()
                .then(res => {
                    // Update local state

                    setOriginalAllCoupons(res.data);
                    setAllCoupons(res.data);

                    // Update app state

                    store.dispatch(gotAllCouponsAction(res.data))
                    console.log(originalAllCoupons);
                    if (store.getState().userReducer.user.token) {
                        setAllCoupons(res.data.filter(coup => !customerCoupons.map(coup => coup.id).includes(coup.id)));
                    }
                    // console.log(ids);
                    // console.log(originalAllCoupons);
                    // console.log(intersection);

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {

        if (store.getState().userReducer.user.token) {
            // console.log(ids);
            // console.log(originalAllCoupons);
            // console.log(intersection);
            // console.log(customerCoupons);
            // console.log(allCoupons);

            setAllCoupons(originalAllCoupons.filter(coup => !customerCoupons.map(coup => coup.id).includes(coup.id)));
        }
    }, []);

    return (
        <div className="GetAllCoupons">
            {
                (allCoupons?.length > 0) ?
                    <>{allCoupons.map((coup, idx) =>
                        <div key={idx}>
                            <ol>
                                <li>{coup.id}</li>
                                <li>{fixedCategory(coup.category)}</li>
                                <li>{coup.title}</li>
                                <li>{coup.description}</li>
                                <li>{coup.startDate}</li>
                                <li>{coup.endDate}</li>
                                <li>{coup.amount}</li>
                                <li>{coup.price}</li>
                                <li><img src={coup.image} alt="N/A" /></li>
                                <li>
                                    <button onClick={() => purchaseCoupon(coup.id)}>Purchase</button>
                                </li>
                            </ol>

                        </div>
                    )}</>

                    : <div></div>
            }
        </div>
    );
}

export default GetAllCoupons;
