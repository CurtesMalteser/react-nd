import { Outlet } from "react-router-dom";
import AppNavBar from "../components/AppNavBar";

function HomeOutlet() {
    return (
        <>
            <AppNavBar />
            <Outlet />
        </>
    );
}

export default HomeOutlet;