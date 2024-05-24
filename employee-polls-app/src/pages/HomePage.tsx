import { useEffect } from "react";
import { fetchUser, isAuthed, status } from "../features/authedUser/authedUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";


export default function HomePage() {
    const authedUserStatus = useAppSelector(status);
    const isLoggedIn = useAppSelector(isAuthed);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);


    if (authedUserStatus === 'loading') {
        return <div>Loading...</div>
    }

    if (authedUserStatus === 'failed') {
        return <div>Error loading user</div> // Maybe add global error handling page on App router
    }

    if (!isLoggedIn) {
        return <Navigate to={'login'} />
    }

    return (
        <h1>Home Page</h1>
    );
}