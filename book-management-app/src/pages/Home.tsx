import { useEffect, useState, useContext } from 'react';
import BooksList from '../components/books/BooksList';
import { getAll } from '../utils/BooksAPI';
import { BookShelfContext } from '../store/BookShelfContext';

function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setBooks } = useContext(BookShelfContext)

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
      {!isLoading && <BooksList />}
    </>
  );

}

export default HomePage;
