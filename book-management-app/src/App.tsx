import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from "react";
import HomePage from './pages/Home';
import RouteLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import BookDetails from './pages/BookDetails';
import { loader as bookLoader } from './pages/BookDetails';
import BookSearch from './pages/BookSearch';
import {BookShelfContext} from './store/BookShelfContext';
import Book from "./components/books/Book";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/book/:id',
        element: <BookDetails />,
        loader: bookLoader
      },
      {
        path: '/search',
        element: <BookSearch />
      }
    ]
  },
])

function App() {

  const [books, setBooks] = useState<Book[]>([])

  function addToShelf(book: Book) {
    const index = books.findIndex(b => b.id === book.id)
    if(index === -1) {
      setBooks([...books, book])
    } else {
      const updatedBooks = [...books]
      updatedBooks[index] = book
      setBooks(updatedBooks)
    }
  }

 const ctx = { books, setBooks, addToShelf }
  return (
    <BookShelfContext.Provider value={ctx}>
    <RouterProvider router={router} />
    </BookShelfContext.Provider>
  )
}

export default App;
