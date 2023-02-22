import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import store from "../../../Redux/Store";
import authUtils from "../../../Utils/AuthUtils";
import Login from "../../Authentication/Login/Login";
import Logout from "../../Authentication/Logout/Logout";
import Register from "../../Authentication/Register/Register";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Page404 from "../../Pages/Page404/Page404";
import AddCompany from "../../UsersArea/AdminArea/CompaniesSection/AddCompany/AddCompany";
import DeleteCompany from "../../UsersArea/AdminArea/CompaniesSection/DeleteCompany/DeleteCompany";
import GetAllCompanies from "../../UsersArea/AdminArea/CompaniesSection/GetAllCompanies/GetAllCompanies";
import UpdateCompany from "../../UsersArea/AdminArea/CompaniesSection/UpdateCompany/UpdateCompany";
import AddCustomer from "../../UsersArea/AdminArea/CustomersSection/AddCustomer/AddCustomer";
import DeleteCustomer from "../../UsersArea/AdminArea/CustomersSection/DeleteCustomer/DeleteCustomer";
import GetAllCustomers from "../../UsersArea/AdminArea/CustomersSection/GetAllCustomers/GetAllCustomers";
import UpdateCustomer from "../../UsersArea/AdminArea/CustomersSection/UpdateCustomer/UpdateCustomer";
import AddCoupon from "../../UsersArea/CompanyArea/AddCoupon/AddCoupon";
import DeleteCoupon from "../../UsersArea/CompanyArea/DeleteCoupon/DeleteCoupon";
import GetCompanyCoupons from "../../UsersArea/CompanyArea/GetCompanyCoupons/GetCompanyCoupons";
import GetCompanyDetails from "../../UsersArea/CompanyArea/GetCompanyDetails/GetCompanyDetails";
import UpdateCoupon from "../../UsersArea/CompanyArea/UpdateCoupon/UpdateCoupon";
import GetAllCoupons from "../../UsersArea/CouponArea/GetAllCoupons/GetAllCoupons";
import GetCustomerCoupons from "../../UsersArea/CustomerArea/GetCustomerCoupons/GetCustomerCoupons";
import GetCustomerDetails from "../../UsersArea/CustomerArea/GetCustomerDetails/GetCustomerDetails";
import PurchaseCoupon from "../../UsersArea/CustomerArea/PurchaseCoupon/PurchaseCoupon";
import "./Routing.css";

function Routing(): JSX.Element {

    const [user, setUser] = useState(store.getState().userReducer.user);

    useEffect(() => {
        return store.subscribe(() => {
            setUser(store.getState().userReducer.user);
        });
    },
        []);

    return (
        <div className="Routing">

            <Routes>

                <Route path="/" element={<App />} />

                <Route path="home" element={<Home />} />

                <Route index element={<Home />} />

                <Route path="about" element={<About />} />

                <Route path="coupons" element={<GetAllCoupons />} />

                <Route path="register" element={(authUtils.isLoggedIn(user)) ? <Home /> : <Register />} />

                <Route path="login" element={(authUtils.isLoggedIn(user)) ? <Home /> : <Login />} />

                <Route path="logout" element={(authUtils.isLoggedIn(user)) ? <Logout /> : <Login />} />

                <Route path="companies" element={(authUtils.isValidAdmin(user)) ? <GetAllCompanies /> : <Page404 />} />

                <Route path="companies/add" element={(authUtils.isValidAdmin(user)) ? <AddCompany /> : <Page404 />} />

                <Route path="companies/delete/:id" element={(authUtils.isValidAdmin(user)) ? <DeleteCompany /> : <Page404 />} />

                <Route path="companies/update/:id" element={(authUtils.isValidAdmin(user)) ? <UpdateCompany /> : <Page404 />} />

                <Route path="customers" element={(authUtils.isValidAdmin(user)) ? <GetAllCustomers /> : <Page404 />} />

                <Route path="customers/add" element={(authUtils.isValidAdmin(user)) ? <AddCustomer /> : <Page404 />} />

                <Route path="customers/delete/:id" element={(authUtils.isValidAdmin(user)) ? <DeleteCustomer /> : <Page404 />} />

                <Route path="customers/update/:id" element={(authUtils.isValidAdmin(user)) ? <UpdateCustomer /> : <Page404 />} />

                <Route path="companies/coupons" element={(authUtils.isValidCompany(user)) ? <GetCompanyCoupons /> : <Page404 />} />

                <Route path="companies/coupons/add" element={(authUtils.isValidCompany(user)) ? <AddCoupon /> : <Page404 />} />

                <Route path="companies/coupons/delete/:id" element={(authUtils.isValidCompany(user)) ? <DeleteCoupon /> : <Page404 />} />

                <Route path="companies/coupons/update/:id" element={(authUtils.isValidCompany(user)) ? <UpdateCoupon /> : <Page404 />} />

                <Route path="companies/profile" element={(authUtils.isValidCompany(user)) ? <GetCompanyDetails /> : <Page404 />} />

                <Route path="coupons/purchase/:id" element={(authUtils.isValidCustomer(user)) ? <PurchaseCoupon /> : <Page404 />} />

                <Route path="customers/coupons" element={(authUtils.isValidCustomer(user)) ? <GetCustomerCoupons /> : <Page404 />} />

                <Route path="customers/profile" element={(authUtils.isValidCustomer(user)) ? <GetCustomerDetails /> : <Page404 />} />

                <Route path="*" element={<Page404 />} />

            </Routes>
        </div>
    );
}

export default Routing;
