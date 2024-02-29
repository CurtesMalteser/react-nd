import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import AddBooks from './pages/AddBooks';


const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/add-books', element: <AddBooks /> }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
