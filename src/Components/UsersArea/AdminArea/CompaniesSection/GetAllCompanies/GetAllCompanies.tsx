import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/Company";
import { gotAllCompaniesAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./GetAllCompanies.css";

function GetAllCompanies(): JSX.Element {

    const navigate = useNavigate();
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().adminReducer.companies);

    const deleteCompany = (id: number) => {
        navigate("delete/" + id);
    }

    const updateCompany = (id: number) => {
        navigate("update/" + id);
    }

    useEffect(() => {
        const token = store.getState().userReducer.user.token;

        if (!token) {
            navigate("/login");
        }
        else if (companies.length === 0) {
            adminWebApi.getAllCompanies()
                .then(res => {
                    // Update local state
                    setCompanies(res.data);

                    // Update app state

                    store.dispatch(gotAllCompaniesAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => console.log(err));
        }
    }, []);

    return (
        <div className="GetAllCompanies">
            {
                (companies?.length > 0) ?

                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            {companies.map((comp, idx) => <tr key={idx}>
                                <td>{comp.id})</td>
                                <td>{comp.name}</td>
                                <td>{comp.email}</td>
                                <td>
                                    <button onClick={() => deleteCompany(comp.id)}>Delete</button>
                                    <button onClick={() => updateCompany(comp.id)}>Update</button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                    : <div></div>
            }
        </div>
    );
}

export default GetAllCompanies;
