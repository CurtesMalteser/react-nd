import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LoginPage from "../pages/Login";
import HomePage from "../pages/HomePage";
import HomeOutlet from '../pages/HomeOutlet';
import { useEffect } from "react";
import { fetchUser, isAuthed, status } from "../features/authedUser/authedUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/', element: <HomeOutlet />, children:[
          { path: '/', element: <HomePage /> },
        ],
      },
      { path: '/login', element: <LoginPage /> },
    ]
  }
]);

function App() {

  const authedUserStatus = useAppSelector(status);
  const isLoggedIn = useAppSelector(isAuthed);
  const dispatch = useAppDispatch();

  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
      dispatch(fetchUser());
  }, []);


  if (authedUserStatus === 'loading') {
      return <div>Loading...</div>
  }

  if (authedUserStatus === 'failed') {
      return <div>Error loading user</div> // Maybe add global error handling page on App router
  }

  // if (!isLoggedIn) {
  //     return <Navigate to={'login'} />
  // }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
