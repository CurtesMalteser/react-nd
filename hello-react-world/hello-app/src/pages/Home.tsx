import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import BooksList from '../components/books/BooksList';


const apiUrl = 'http://127.0.0.1:5000'

function HomePage() {
  const [books, setBooks] = useState<{
    author: string; id: string;
    rating: number;
    title: string;
  }[]>([])

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`${apiUrl}/books`)
      const data = await res.json()
      setBooks(data.books)
    }
    fetchBooks()
  }, [books])


  return (
    <>
      <Header />
      <BooksList books={books} />
    </>
  );
}

export default HomePage;