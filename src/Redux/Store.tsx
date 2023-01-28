
import { combineReducers, createStore } from "redux";
import { adminReducer } from "./AppStates/AdminAppState";
import { companyReducer } from "./AppStates/CompanyAppState";
import { userReducer } from "./AppStates/UserAppState";

const reducers = combineReducers({ userReducer: userReducer, adminReducer: adminReducer, companyReducer: companyReducer});
const store = createStore(reducers);


export default store;