import './App.css';
import { useEffect, useState } from 'react';
import { Header } from './components/header/Header';
import { BooksList } from './components/books/BooksList';

const books = [
  {
    "author": "Kristin Hannah",
    "id": "3",
    "rating": 4,
    "title": "The Great Alone"
  },
  {
    "author": "Leila Slimani",
    "id": "6",
    "rating": 2,
    "title": "Lullaby"
  },
]

function App() {

  const [getBooks, setBooks] = useState<{
    author: string; id: string;
    rating: number;
    title: string;
  }[]>([])

  // TODO: fetch books from an API
  useEffect(() => { setBooks(books) }, [getBooks])


  return (
    <div className="App">
      <Header />
      <BooksList books={getBooks} />
    </div>
  );
}

export default App;
