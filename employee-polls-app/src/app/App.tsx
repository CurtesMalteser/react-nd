import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import HomeOutlet from '../pages/HomeOutlet';
import { useEffect } from "react";
import { 
  fetchUser,
  status,
  loginError,
 } from "../features/authedUser/authedUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import LeaderboardPage from '../pages/LeaderboardPage';
import ROUTES from '../constants/routes';
import NewPollPage from '../pages/NewPollPage';
import HomeLoader from '../components/loader/HomeLoader';
import PollPage from '../pages/PollPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Outlet />,
    children: [
      {
        path: ROUTES.HOME, element: <HomeOutlet />, children: [
          { path: ROUTES.HOME, element: <HomePage /> },
          { path: ROUTES.LEADERBOARD, element: <LeaderboardPage /> },
          { path: ROUTES.NEW_QUESTION, element: <NewPollPage /> },
          { path: ROUTES.ANSWER_POOL, element: <PollPage /> },
        ],
      },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
    ]
  }
]);

function App() {

  const authedUserStatus = useAppSelector(status);
  const isLoginError = useAppSelector(loginError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (authedUserStatus === 'loading') { 
    return <HomeLoader />
  }

  if (authedUserStatus === 'failed' && !isLoginError) {
    // perform logout if the user doesn't exist and isn't a login error
    return <div>Error loading user</div> // add global error handling page on App router
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
