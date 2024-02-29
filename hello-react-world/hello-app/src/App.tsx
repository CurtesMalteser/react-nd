import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import AddBooks from './pages/AddBooks';
import RouteLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';


const router = createBrowserRouter([
  { 
    path: '/',
    element: <RouteLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/add-books', element: <AddBooks /> },
    ]
  },
])

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App;
