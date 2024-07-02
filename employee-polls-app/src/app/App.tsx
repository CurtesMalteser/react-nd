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
import GlobalErrorPage from '../pages/GlobalErrorPage';
import RequireAuth from '../hooks/useRequireAuth';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Outlet />,
    errorElement: <GlobalErrorPage />,
    children: [
      {
        path: ROUTES.HOME, element: <HomeOutlet />, children: [
          { path: ROUTES.HOME, element: <HomePage /> },
          { path: ROUTES.LEADERBOARD, element: <RequireAuth><LeaderboardPage /></RequireAuth> },
          { path: ROUTES.NEW_QUESTION, element: <RequireAuth><NewPollPage /></RequireAuth> },
          { path: ROUTES.ANSWER_POOL, element: <RequireAuth><PollPage /></RequireAuth> },
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
    return <GlobalErrorPage />
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
