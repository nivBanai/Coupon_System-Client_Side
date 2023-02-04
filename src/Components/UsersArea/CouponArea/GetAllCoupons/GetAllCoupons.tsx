import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCouponsAction } from "../../../../Redux/AppStates/CouponAppState";
import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import couponWebApi from "../../../../Services/WebApi/CouponWebApi";
import utils from "../../../../Utils/Utils";
import "./GetAllCoupons.css";

function GetAllCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [originalCoupons, setOriginalCoupons] = useState<CouponModel[]>(store.getState().couponReducer.allCoupons);
    const [coupons, setCoupons] = useState<CouponModel[]>(originalCoupons);
    const [customerCoupons, setCustomerCoupons] = useState<CouponModel[]>(store.getState().customerReducer.coupons);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const couponsWithOutCustomerCoupons = (coupons: CouponModel[]): CouponModel[] => {
        return coupons.filter(coup => !customerCoupons.map(coup => coup.id).includes(coup.id))
    }

    const purchaseCoupon = (id: number) => {
        navigate("purchase/" + id);
    }

    useEffect(() => {

        if (originalCoupons.length === 0) {
            couponWebApi.getAllCoupons()
                .then(res => {
                    // Update local state
                    setOriginalCoupons(res.data);

                    if (store.getState().userReducer.user.token) {
                        setCoupons(couponsWithOutCustomerCoupons(res.data));
                    } else {
                        setCoupons(res.data);
                    }

                    store.dispatch(gotAllCouponsAction(res.data))
                    // Update app state

                    console.log(originalCoupons);


                    // console.log(ids);
                    // console.log(originalAllCoupons);
                    // console.log(intersection);

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err =>
                    notificationsService.errorNotification(err.response.data.message));
        }
    }, []);

    // useEffect(() => {

    //     if (store.getState().userReducer.user.token) {
    //         setCoupons(originalCoupons.filter(coup => !customerCoupons.map(coup => coup.id).includes(coup.id)));
    //     }
    // }, []);

    useEffect(() => {
        if (selectedCategory === "All" && selectedPrice === 0) {
            setCoupons(couponsWithOutCustomerCoupons(originalCoupons));
        }
        if (selectedCategory === "All" && selectedPrice !== 0) {
            setCoupons(couponsWithOutCustomerCoupons(originalCoupons).filter(coup => coup.price < selectedPrice));
        }
        if (selectedCategory !== "All" && selectedPrice === 0) {
            setCoupons(couponsWithOutCustomerCoupons(originalCoupons).filter(coup => coup.category.match(selectedCategory)));
        }
        if (selectedCategory !== "All" && selectedPrice !== 0) {
            setCoupons(couponsWithOutCustomerCoupons(originalCoupons).filter(coup => coup.category.match(selectedCategory) && coup.price < selectedPrice));
        }
    }, [selectedCategory, selectedPrice]);

    return (
        <div className="GetAllCoupons">
            {
                (coupons.length > 0 || originalCoupons.length > 0) ?
                    <>
                        <span>Filter By Category </span>
                        <select onChange={val => { setSelectedCategory(val.target.value) }} id="category" defaultValue={"All"} >
                            <option value={"All"}>All</option>
                            <option value={"CINEMA"}>Cinema</option>
                            <option value={"FOOD"}>Food</option>
                            <option value={"SPORTS_GEAR"}>Sports Gear</option>
                            <option value={"TRADING_CARDS"}>Trading Cards</option>
                            <option value={"VIDEO_GAMES"}>Video Games</option>
                        </select>

                        <span>Filter By Price</span>
                        <input onChange={(val) => setSelectedPrice(+val.target.value)} id="price" name="price" type="number" placeholder="price" />

                        {coupons.map((coup, idx) =>
                            <div key={idx}>
                                <ol>
                                    <li>{coup.id}</li>
                                    <li>{utils.fixedCategory(coup.category)}</li>
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

                    : <div>No Coupons</div>
            }
        </div>
    );
}

export default GetAllCoupons;
