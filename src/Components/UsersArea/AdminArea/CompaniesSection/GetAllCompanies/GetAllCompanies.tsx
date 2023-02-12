import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../../Models/Company";
import { gotAllCompaniesAction } from "../../../../../Redux/AppStates/AdminAppState";
import store from "../../../../../Redux/Store";
import notificationsService from "../../../../../Services/NotificationsService";
import adminWebApi from "../../../../../Services/WebApi/AdminWebApi";
import { TbEdit } from "react-icons/tb";
import { ImBin2 } from "react-icons/im";
import "./GetAllCompanies.css";

function GetAllCompanies(): JSX.Element {

    const navigate = useNavigate();
    const [originalCompanies, setOriginalCompanies] = useState<CompanyModel[]>(store.getState().adminReducer.companies);
    const [companies, setCompanies] = useState<CompanyModel[]>(originalCompanies);
    const [search, setSearch] = useState("");

    const addCompany = () => {
        navigate("add");
    }

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
                .catch(err => notificationsService.errorNotification(err.response.message));
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
                        <div className="companiesSearchBar">
                            <input onChange={(val) => setSearch(val.target.value)} id="search" name="search" type="text" placeholder="Search in companies" />
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
                                    {companies.map((comp, idx) => <tr key={idx}>
                                        <td>{comp.id})</td>
                                        <td><img src={comp.profilePic} alt="N/A" />{comp.name}</td>
                                        <td>{comp.email}</td>
                                        <td>
                                            <button onClick={() => updateCompany(comp.id)}><TbEdit size={40} /></button>
                                            <button onClick={() => deleteCompany(comp.id)}><ImBin2 size={40} /></button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div id="addCompanyButtonContainer">
                            <button id="addCompanyButton" onClick={() => addCompany()}>Add Company</button>
                        </div>
                    </>
                    : <div></div>
            }
        </div>
    );
}

export default GetAllCompanies;
