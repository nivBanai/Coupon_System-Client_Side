import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/Company";
import { CustomerModel } from "../../../../../Models/Customer";
import { gotAllCompaniesAction, gotAllCustomersAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import notificationsService from "../../../../../Services/NotificationsService";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import { TbEdit } from "react-icons/tb";
import { ImBin2 } from "react-icons/im";
import "./GetAllCustomers.css";
import EmptyCustomersView from "./EmptyCustomersView/EmptyCustomersView";

function GetAllCustomers(): JSX.Element {

    const navigate = useNavigate();
    const [originalCustomers, setOriginalCustomers] = useState<CustomerModel[]>(store.getState().adminReducer.customers);
    const [customers, setCustomers] = useState<CustomerModel[]>(originalCustomers);
    const [search, setSearch] = useState("");

    const addCustomer = () => {
        navigate("add");
    }

    const deleteCustomer = (id: number) => {
        navigate("delete/" + id);
    }

    const updateCustomer = (id: number) => {
        navigate("update/" + id);
    }

    useEffect(() => {
        const token = store.getState().userReducer.user.token;

        if (!token) {
            navigate("/login");
        }
        else if (customers.length === 0) {
            adminWebApi.getAllCustomers()
                .then(res => {
                    // Update local state
                    setOriginalCustomers(res.data);
                    setCustomers(res.data);

                    // Update app state

                    store.dispatch(gotAllCustomersAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err =>
                    notificationsService.errorNotification(err.response.data.message));
        }
    }, []);

    useEffect(() => {
        if (search) {
            setCustomers(originalCustomers.filter(cus =>
                cus.id.toString().includes(search) ||
                cus.firstName.toLowerCase().includes(search.toLowerCase()) ||
                cus.lastName.toLowerCase().includes(search.toLowerCase()) ||
                (cus.firstName.toLowerCase() + " " + cus.lastName.toLowerCase()).includes(search.toLowerCase()) ||
                cus.email.toLowerCase().includes(search.toLowerCase())));
        }
        else {
            setCustomers(originalCustomers);
        }
    }, [search]);

    return (
        <div className="GetAllCustomers">

            {
                (customers?.length > 0 || originalCustomers?.length > 0) ?

                    <>
                        <div className="companiesSearchBar">
                            <input onChange={(val) => setSearch(val.target.value)} id="search" name="search" type="text" placeholder="Search in customers" />
                        </div>

                        <div className="TableContainer">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                    {customers.map((cus, idx) => <tr key={idx}>
                                        <td>{cus.id})</td>
                                        <td><img src={cus.profilePic} alt="N/A" />{cus.lastName} {cus.firstName}</td>
                                        <td>{cus.email}</td>
                                        <td>
                                            <button onClick={() => updateCustomer(cus.id)}><TbEdit size={40} /></button>
                                            <button onClick={() => deleteCustomer(cus.id)}><ImBin2 size={40} /></button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div id="addCompanyButtonContainer">
                            <button id="addCompanyButton" onClick={() => addCustomer()}>Add Customer</button>
                        </div>
                    </>
                    : <EmptyCustomersView />
            }
        </div>
    );
}

export default GetAllCustomers;
