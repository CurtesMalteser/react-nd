import { isAuthed } from "../features/authedUser/authedUserSlice";
import { useAppSelector } from "../app/hooks";
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