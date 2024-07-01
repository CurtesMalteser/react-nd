import { useNavigate } from "react-router-dom";
import AppNavBar from "../components/AppNavBar";
import ErrorComponent from "../components/error/ErrorComponent";
import ROUTES from "../constants/routes";
import Button from "react-bootstrap/esm/Button";
import { HouseUpFill } from "react-bootstrap-icons";

function GlobalErrorPage() {

    const navigate = useNavigate();

    return (
        <>
            <AppNavBar />
            <ErrorComponent label="We coudn't find the path you're looking for." />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="success" onClick={() => navigate(ROUTES.HOME)}><HouseUpFill size={24} style={{ marginRight: '10px' }} />Go Home</Button>
            </div>
        </>
    );
}

export default GlobalErrorPage;