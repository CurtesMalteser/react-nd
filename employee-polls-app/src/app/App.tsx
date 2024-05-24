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
import LeaderboardPage from '../pages/LeaderboardPage';
import ROUTES from '../constants/routes';
import NewQuestionPage from '../pages/NewQuestionPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Outlet />,
    children: [
      {
        path: ROUTES.HOME, element: <HomeOutlet />, children:[
          { path: ROUTES.HOME, element: <HomePage /> },
          { path: ROUTES.LEADERBOARD, element: <LeaderboardPage /> },
          { path: ROUTES.NEW_QUESTION, element: <NewQuestionPage /> },
        ],
      },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
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

  return (
    <RouterProvider router={router} />
  );
}

export default App;
