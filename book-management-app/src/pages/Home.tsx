import { useEffect, useState } from 'react';
import BooksList from '../components/books/BooksList';
import { getAll } from '../utils/BooksAPI';
import Book from '../components/books/Book';

function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [books, setBooks] = useState<Book[]>([])
  
  useEffect(() => {
    async function fetchBooks() {
      const data = await getAll()
      setBooks(data.books)
      setIsLoading(false)
    }
    fetchBooks()
  }, [setBooks])


  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && <BooksList books={books} />}
    </>
  );

}

export default HomePage;
