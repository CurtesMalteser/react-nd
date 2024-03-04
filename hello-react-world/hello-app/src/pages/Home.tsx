import { useEffect, useState } from 'react';
import BooksList from '../components/books/BooksList';
import { getAll } from '../utils/BooksAPI';


const apiUrl = 'http://127.0.0.1:5000'

function HomePage() {
  const [books, setBooks] = useState<{
    author: string; id: string;
    rating: number;
    title: string;
  }[]>([])

  useEffect(() => {
    async function fetchBooks() {
      const data = await getAll()
      setBooks(data.books)
    }
    fetchBooks()
  }, [books])


  return (
    <>
      <BooksList books={books} />
    </>
  )
}

export default HomePage;