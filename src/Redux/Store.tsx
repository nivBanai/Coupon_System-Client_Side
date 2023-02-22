
import { combineReducers, createStore } from "redux";
import { adminReducer } from "./AppStates/AdminAppState";
import { companyReducer } from "./AppStates/CompanyAppState";
import { couponReducer } from "./AppStates/CouponAppState";
import { customerReducer } from "./AppStates/CustomerAppState";
import { userReducer } from "./AppStates/UserAppState";

const reducers = combineReducers({
    userReducer: userReducer, adminReducer: adminReducer, companyReducer: companyReducer,
    customerReducer: customerReducer, couponReducer: couponReducer
});
const store = createStore(reducers);


export default store;