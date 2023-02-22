import { useNavigate } from "react-router-dom";
import "./EmptyCompaniesView.css";

function EmptyCompaniesView(): JSX.Element {

    const navigate = useNavigate();

    const addCompany = () => {
        navigate("add");
    };

    return (
        <div className="EmptyCompaniesView EmptyUserView">

            <h1>There Are No Companies Currently</h1>

            <div className="AddUserButtonContainer">
                <button className="AddUserButton" onClick={() => addCompany()}>Add Company</button>
            </div>

        </div>
    );
}

export default EmptyCompaniesView;
