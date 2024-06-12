import { Outlet } from "react-router-dom";
import AppNavBar from "../components/AppNavBar";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { clearLoginError } from "../features/authedUser/authedUserSlice";

function HomeOutlet() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearLoginError())
    }, [dispatch]);

    return (
        <>
            <AppNavBar />
            <Outlet />
        </>
    );
}

export default HomeOutlet;