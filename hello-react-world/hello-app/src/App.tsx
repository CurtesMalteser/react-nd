import './App.css';
import { useEffect, useState } from 'react';
import { Header } from './components/header/Header';
import { BooksList } from './components/books/BooksList';

const apiUrl = 'http://127.0.0.1:5000'

function App() {

  const [books, setBooks] = useState<{
    author: string; id: string;
    rating: number;
    title: string;
  }[]>([])

  useEffect(() => {
    fetch(`${apiUrl}/books`).then((res) => res.json())
      .then((data) => {
        console.log(data)
        setBooks(data.books)
      })
  }, [books])

  // TODO: fetch books from an API


  return (
    <div className="App">
      <Header />
      <BooksList books={books} />
    </div>
  );
}

export default App;
