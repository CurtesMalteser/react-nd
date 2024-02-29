import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import AddBooks from './pages/AddBooks';
import RouteLayout from './pages/RootLayout';


const router = createBrowserRouter([
  { 
    path: '/',
    element: <RouteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/add-books', element: <AddBooks /> },
    ]
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
