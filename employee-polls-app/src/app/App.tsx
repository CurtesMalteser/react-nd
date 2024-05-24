import { useEffect } from "react";
import { fetchUser, isAuthed, status } from "../features/authedUser/authedUserSlice";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import { useAppDispatch, useAppSelector } from "./hooks";

function App() {

  const authedUserStatus = useAppSelector(status);
  const isLoggedIn = useAppSelector(isAuthed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div>
    { authedUserStatus === 'loading' && <h1>Loading...</h1> }
    { authedUserStatus === 'idle' && isLoggedIn && <HomePage /> }
    { authedUserStatus === 'idle' && !isLoggedIn && <Login /> }
    </div>
  );
}

export default App;
