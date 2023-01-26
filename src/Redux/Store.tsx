
import { combineReducers, createStore } from "redux";
import { userReducer } from "./UserAppState";

const reducers = combineReducers({userReducer:userReducer});
const store = createStore(reducers);


export default store;