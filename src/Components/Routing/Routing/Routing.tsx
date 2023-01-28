import { Routes, Route } from "react-router-dom";
import App from "../../../App";
import Login from "../../Authentication/Login/Login";
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
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="about" element={<About />} />
                <Route path="companies" element={<GetAllCompanies />} />
                <Route path="companies/add" element={<AddCompany />} />
                <Route path="companies/delete/:id" element={<DeleteCompany />} />
                <Route path="companies/update/:id" element={<UpdateCompany />} />
                <Route path="customers" element={<GetAllCustomers />} />
                <Route path="customers/add" element={<AddCustomer />} />
                <Route path="customers/delete/:id" element={<DeleteCustomer />} />
                <Route path="customers/update/:id" element={<UpdateCustomer />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
