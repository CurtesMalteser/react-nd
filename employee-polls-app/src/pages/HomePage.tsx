import { useEffect } from "react";
import { fetchUser, isAuthed, status } from "../features/authedUser/authedUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";


export default function HomePage() {

     const isLoggedIn = useAppSelector(isAuthed);

     if (!isLoggedIn) {
         return <Navigate to={'login'} />
     }

    return (
        <h1>Home Page</h1>
    );
}