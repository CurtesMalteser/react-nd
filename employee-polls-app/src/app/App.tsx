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
import HomeLoader from '../components/loader/HomeLoader';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Outlet />,
    children: [
      {
        path: ROUTES.HOME, element: <HomeOutlet />, children: [
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

  // it will be handled the login status in the future in App component
  // to logout from other pagers other than HomePage
  // printing console.log to avoid unused variable warning
  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (authedUserStatus === 'loading') { return <HomeLoader /> }

  if (authedUserStatus === 'failed') {
    return <div>Error loading user</div> // Maybe add global error handling page on App router
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
