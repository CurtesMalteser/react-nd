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
  const isLoggedIn = useAppSelector(isAuthed);
  const dispatch = useAppDispatch();

  // todo: delete isLoggedIn from here
  // it will be handled the login status in the future in App component
  // to logout from other pagers other than HomePage
  // printing console.log to avoid unused variable warning
  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (authedUserStatus === 'loading') { return <HomeLoader /> }

  if (authedUserStatus === 'failed') {
    return <div>Error loading user</div> // add global error handling page on App router
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
