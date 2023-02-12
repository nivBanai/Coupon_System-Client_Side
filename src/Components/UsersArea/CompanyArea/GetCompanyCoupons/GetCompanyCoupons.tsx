import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/Coupon";
import { gotAllCompanyCouponsAction } from "../../../../Redux/AppStates/CompanyAppState";

import store from "../../../../Redux/Store";
import notificationsService from "../../../../Services/NotificationsService";
import companyWebApi from "../../../../Services/WebApi/CompanyWebApi";
import utils from "../../../../Utils/Utils";
import { TbEdit } from "react-icons/tb";
import { ImBin2 } from "react-icons/im";
import "./GetCompanyCoupons.css";
import EmptyCompanyCouponsView from "./EmptyCompanyCouponsView/EmptyCompanyCouponsView";

function GetCompanyCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [originalCoupons, setOriginalCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);
    const [coupons, setCoupons] = useState<CouponModel[]>(originalCoupons);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const addCoupon = () => {
        navigate("add");
    }

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
            companyWebApi.getAllCompanyCoupons()
                .then(res => {
                    setOriginalCoupons(res.data);
                    setCoupons(res.data);
                    store.dispatch(gotAllCompanyCouponsAction(res.data))
                })
                .catch(err => notificationsService.errorNotification(err.response.data.message));

        }
    }, []);

    useEffect(() => {
        if (selectedCategory === "All" && selectedPrice === 0) {
            setCoupons(originalCoupons);
        }
        if (selectedCategory === "All" && selectedPrice !== 0) {
            setCoupons(originalCoupons.filter(coup => coup.price < selectedPrice));
        }
        if (selectedCategory !== "All" && selectedPrice === 0) {
            setCoupons(originalCoupons.filter(coup => coup.category.match(selectedCategory)));
        }
        if (selectedCategory !== "All" && selectedPrice !== 0) {
            setCoupons(originalCoupons.filter(coup => coup.category.match(selectedCategory) && coup.price < selectedPrice));
        }
    }, [selectedCategory, selectedPrice]);


    return (
        <div className="GetCompanyCoupons">

            {/* {
                (coupons?.length > 0 || originalCoupons?.length > 0) ?

                    <>
                     <button onClick={() => addCoupon()}>Add Coupon</button>
                        <span>Filter By Category </span>
                        <select onChange={val => { { setSelectedCategory(val.target.value); console.log("coups:" + coupons); console.log("ogCoupos:" + originalCoupons); } }} id="category" defaultValue={"All"} >
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
                                    <li>{originalCoupons.indexOf(coup) + 1}</li>
                                    <li>{utils.fixedCategory(coup.category)}</li>
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

                    : <div>No Coupons Currently</div>
            } */}




            {
                (coupons.length > 0 || originalCoupons.length > 0) ?
                    <>
                    <div className="TitleContainer">
                                    <h1>My Coupons</h1>
                                </div>
                        <div className="SearchBarsContainer">
                            <div className="SearchBar">
                                <h3>Filter By Category </h3>
                                <select onChange={val => { setSelectedCategory(val.target.value) }} id="category" defaultValue={"All"} >
                                    <option value={"All"}>All</option>
                                    <option value={"CINEMA"}>Cinema</option>
                                    <option value={"FOOD"}>Food</option>
                                    <option value={"SPORTS_GEAR"}>Sports Gear</option>
                                    <option value={"TRADING_CARDS"}>Trading Cards</option>
                                    <option value={"VIDEO_GAMES"}>Video Games</option>
                                </select>
                            </div>
                            <div className="SearchBar">
                                <h3>Filter By Max Price</h3>
                                <input onChange={(val) => setSelectedPrice(+val.target.value)} id="price" name="price" type="number"
                                    placeholder="Type Price" />
                            </div>
                        </div>


                        <div id="addCouponButtonContainer">
                            <button id="addCouponButton" onClick={() => addCoupon()}>Add Coupon</button>
                        </div>

                        <div className="Coupons">
                            {coupons.map((coup, idx) =>

                                <div className="CompanyOwnedCoupon" key={idx}>
                                    <div id="couponHeader">
                                        <p className="couponHeaderItems ownedCouponIdTitle">#{originalCoupons.indexOf(coup) + 1}</p>
                                        <h2 className="couponHeaderItems">{coup.title}</h2>
                                    </div>
                                    <p><img src={"https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505"} alt="N/A" /></p>

                                    <p className="couponItem" id="displayCategory"> {utils.fixedCategory(coup.category)}</p>



                                    <p id="ownedCouponDesc">{coup.description}</p>


                                    <p className="couponItem" id="displayDate"> {utils.fixedDate(coup.startDate)} - {utils.fixedDate(coup.endDate)}</p>
                                    <p className="couponItem " id="displayAmount" >
                                        {(coup.amount > 0) ?
                                            <p className={(coup.amount > 5) ? "displayGreenAmount" : "displayOrangeAmount"}>{coup.amount} Left</p>
                                            : <p className="displayRedAmount"> Out Of Stock</p>
                                        }
                                    </p>
                                    <div id="companyCouponFooter">
                                        <p className="displayOwnedCouponPrice">
                                            {coup.price} &#x20AA;
                                        </p>
                                        <p>
                                            <button onClick={() => updateCoupon(coup.id)}><TbEdit size={40} /></button>
                                            <button onClick={() => deleteCoupon(coup.id)}><ImBin2 size={40} /></button>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>

                    : <EmptyCompanyCouponsView />   
            }

        </div>
    );
}

export default GetCompanyCoupons;
