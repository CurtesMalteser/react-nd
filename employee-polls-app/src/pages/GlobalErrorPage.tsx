import AppNavBar from "../components/AppNavBar";
import ErrorComponent from "../components/error/ErrorComponent";

function GlobalErrorPage() {
    return (
        <>
            <AppNavBar />
            <ErrorComponent label="We coudn't find the path you're looking for. " />
        </>
    );
}

export default GlobalErrorPage;