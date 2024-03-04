import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import AddBooks from './pages/AddBooks';
import RouteLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import BookDetails from './pages/BookDetails';
import { loader as bookLoader } from './pages/BookDetails';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/add-books', element: <AddBooks /> },
      {
        path: '/book/:id',
        element: <BookDetails />,
        loader: bookLoader
      },
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
