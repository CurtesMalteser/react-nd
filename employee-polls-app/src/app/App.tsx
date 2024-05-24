import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LoginPage from "../pages/Login";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
    ]
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
