import { useEffect } from "react";
import { fetchUser, isAuthed, authedUser } from "../features/authedUser/authedUserSlice";
import Login from "../pages/Login";
import { useAppDispatch, useAppSelector } from "./hooks";

function App() {

  const isLoggedIn = useAppSelector(isAuthed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div>
    <Login />
    <h6>isLoggedIn: { isLoggedIn ? 'true' : 'false' }</h6>
    </div>
  );
}

export default App;
