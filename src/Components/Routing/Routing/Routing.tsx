import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import store from "../../../Redux/Store";
import Login from "../../Authentication/Login/Login";
import Logout from "../../Authentication/Logout/Logout";
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

    const validAdmin = (): boolean => {
        return (user.token && user.clientType === "ADMINISTRATOR") ? true : false;
    };
    const validCompany = (): boolean => {
        return (user.token && user.clientType === "COMPANY") ? true : false;
    };
    const validCustomer = (): boolean => {
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

                <Route path="login" element={<Login />} />

                <Route path="logout" element={<Logout />} />

                <Route path="about" element={<About />} />

                <Route path="coupons" element={<GetAllCoupons />} />

                <Route path="companies" element={(validAdmin()) ? <GetAllCompanies /> : <Page404 />} />

                <Route path="companies/add" element={(validAdmin()) ? <AddCompany /> : <Page404 />} />

                <Route path="companies/delete/:id" element={(validAdmin()) ? <DeleteCompany /> : <Page404 />} />

                <Route path="companies/update/:id" element={(validAdmin()) ? <UpdateCompany /> : <Page404 />} />

                <Route path="customers" element={(validAdmin()) ? <GetAllCustomers /> : <Page404 />} />

                <Route path="customers/add" element={(validAdmin()) ? <AddCustomer /> : <Page404 />} />

                <Route path="customers/delete/:id" element={(validAdmin()) ? <DeleteCustomer /> : <Page404 />} />

                <Route path="customers/update/:id" element={(validAdmin()) ? <UpdateCustomer /> : <Page404 />} />

                <Route path="companies/coupons" element={(validCompany()) ? <GetCompanyCoupons /> : <Page404 />} />

                <Route path="companies/coupons/add" element={(validCompany()) ? <AddCoupon /> : <Page404 />} />

                <Route path="companies/coupons/delete/:id" element={(validCompany()) ? <DeleteCoupon /> : <Page404 />} />

                <Route path="companies/coupons/update/:id" element={(validCompany()) ? <UpdateCoupon /> : <Page404 />} />

                <Route path="companies/details" element={(validCompany()) ? <GetCompanyDetails /> : <Page404 />} />

                <Route path="coupons/purchase/:id" element={(validCustomer()) ? <PurchaseCoupon /> : <Page404 />} />

                <Route path="customers/coupons" element={(validCustomer()) ? <GetCustomerCoupons /> : <Page404 />} />

                <Route path="customers/details" element={(validCustomer()) ? <GetCustomerDetails /> : <Page404 />} />
                
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
