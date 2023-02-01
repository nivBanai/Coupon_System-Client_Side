import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/Company";
import { gotAllCompaniesAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import "./GetAllCompanies.css";

function GetAllCompanies(): JSX.Element {

    const navigate = useNavigate();
    const [originalCompanies, setOriginalCompanies] = useState<CompanyModel[]>(store.getState().adminReducer.companies);
    const [companies, setCompanies] = useState<CompanyModel[]>(originalCompanies);
    const [search, setSearch] = useState("");

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
                    setOriginalCompanies(res.data);
                    setCompanies(res.data);

                    // Update app state

                    store.dispatch(gotAllCompaniesAction(res.data));

                    // notify.success('Woho I got my element from server side!!!')
                })
                .catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {
        if (search) {
            setCompanies(originalCompanies.filter(comp =>
                comp.id.toString().includes(search) || comp.name.toLowerCase().includes(search.toLowerCase()) || comp.email.toLowerCase().includes(search.toLowerCase())));
        }
        else {
            setCompanies(originalCompanies);
        }
    }, [search]);

    return (
        <div className="GetAllCompanies">
            {
                (companies?.length > 0 || originalCompanies?.length > 0) ?

                    <>
                        <span>Search</span>
                        <input onChange={(val) => setSearch(val.target.value)} id="search" name="search" type="text" placeholder="search" />
                        <table>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                    <span>{search}</span>
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
                    </>
                    : <div></div>
            }
        </div>
    );
}

export default GetAllCompanies;
