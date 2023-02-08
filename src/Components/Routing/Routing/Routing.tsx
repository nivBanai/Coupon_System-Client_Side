import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import store from "../../../Redux/Store";
import Login from "../../Authentication/Login/Login";
import Logout from "../../Authentication/Logout/Logout";
import Register from "../../Authentication/Register/Register";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Page404 from "../../Pages/Page404/Page404";
import AddCompany from "../../UsersArea/AdminArea/CompaniesSection/AddCompany/AddCompany";
import DeleteCompany from "../../UsersArea/AdminArea/CompaniesSection/DeleteCompany/DeleteCompany";
import GetAllCompanies from "../../UsersArea/AdminArea/CompaniesSection/GetAllCompanies/GetAllCompanies";
import UpdateCompany from "../../UsersArea/AdminArea/CompaniesSection/UpdatedCompany/UpdateCompany";
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

    const isLoggedIn = (): boolean => {
        return (user.token) ? true : false;
    };

    const isValidAdmin = (): boolean => {
        return (user.token && user.clientType === "ADMINISTRATOR") ? true : false;
    };
    const isValidCompany = (): boolean => {
        return (user.token && user.clientType === "COMPANY") ? true : false;
    };
    const isValidCustomer = (): boolean => {
        return (user.token && user.clientType === "CUSTOMER") ? true : false;
    };

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

                <Route path="register" element={(isLoggedIn()) ? <Home /> : <Register />} />

                <Route path="login" element={(isLoggedIn()) ? <Home /> : <Login />} />

                <Route path="logout" element={(isLoggedIn()) ? <Logout /> : <Login />} />

                <Route path="companies" element={(isValidAdmin()) ? <GetAllCompanies /> : <Page404 />} />

                <Route path="companies/add" element={(isValidAdmin()) ? <AddCompany /> : <Page404 />} />

                <Route path="companies/delete/:id" element={(isValidAdmin()) ? <DeleteCompany /> : <Page404 />} />

                <Route path="companies/update/:id" element={(isValidAdmin()) ? <UpdateCompany /> : <Page404 />} />

                <Route path="customers" element={(isValidAdmin()) ? <GetAllCustomers /> : <Page404 />} />

                <Route path="customers/add" element={(isValidAdmin()) ? <AddCustomer /> : <Page404 />} />

                <Route path="customers/delete/:id" element={(isValidAdmin()) ? <DeleteCustomer /> : <Page404 />} />

                <Route path="customers/update/:id" element={(isValidAdmin()) ? <UpdateCustomer /> : <Page404 />} />

                <Route path="companies/coupons" element={(isValidCompany()) ? <GetCompanyCoupons /> : <Page404 />} />

                <Route path="companies/coupons/add" element={(isValidCompany()) ? <AddCoupon /> : <Page404 />} />

                <Route path="companies/coupons/delete/:id" element={(isValidCompany()) ? <DeleteCoupon /> : <Page404 />} />

                <Route path="companies/coupons/update/:id" element={(isValidCompany()) ? <UpdateCoupon /> : <Page404 />} />

                <Route path="companies/profile" element={(isValidCompany()) ? <GetCompanyDetails /> : <Page404 />} />

                <Route path="coupons/purchase/:id" element={(isValidCustomer()) ? <PurchaseCoupon /> : <Page404 />} />

                <Route path="customers/coupons" element={(isValidCustomer()) ? <GetCustomerCoupons /> : <Page404 />} />

                <Route path="customers/profile" element={(isValidCustomer()) ? <GetCustomerDetails /> : <Page404 />} />

                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
