import { useNavigate } from "react-router-dom";
import "./EmptyCompaniesView.css";

function EmptyCompaniesView(): JSX.Element {

    const navigate = useNavigate();

    const addCompany = () => {
        navigate("add");
    }

    return (
        <div className="EmptyCompaniesView">
			<h1>There Are No Companies Currently</h1>
            <div id="addCouponButtonContainer">
                <button id="addCouponButton" onClick={() => addCompany()}>Add Company</button>
            </div>
        </div>
    );
}

export default EmptyCompaniesView;
