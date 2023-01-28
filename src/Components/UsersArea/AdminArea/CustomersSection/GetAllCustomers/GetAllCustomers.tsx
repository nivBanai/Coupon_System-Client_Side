import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/Company";
import { CustomerModel } from "../../../../../Models/Customer";
import { gotAllCompaniesAction, gotAllCustomersAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./GetAllCustomers.css";

function GetAllCustomers(): JSX.Element {

    const navigate = useNavigate();
    const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().adminReducer.customers);

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
                    setCustomers(res.data);

                    // Update app state

                    store.dispatch(gotAllCustomersAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => console.log(err));
        }
    }, []);

    return (
        <div className="GetAllCustomers">
            {
                (customers?.length > 0) ?

                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            {customers.map((cus, idx) => <tr key={idx}>
                                <td>{cus.id})</td>
                                <td>{cus.firstName}</td>
                                <td>{cus.lastName}</td>
                                <td>{cus.email}</td>
                                <td>
                                    <button onClick={() => deleteCustomer(cus.id)}>Delete</button>
                                    <button onClick={() => updateCustomer(cus.id)}>Update</button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                    : <div></div>
            }
        </div>
    );
}

export default GetAllCustomers;
