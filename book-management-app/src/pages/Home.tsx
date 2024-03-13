import { useEffect, useState } from 'react';
import BooksList from '../components/books/BooksList';
import { getAll } from '../utils/BooksAPI';
import splitBooksByShelf from '../utils/BooksSorter';


const apiUrl = 'http://127.0.0.1:5000'

function HomePage() {
  const [readBooks, setReadBooks] = useState<{
    author: string; id: string;
    rating: number;
    title: string;
  }[]>([])

  const [wantToRead, setWantToRead] = useState<{
    author: string; id: string;
    rating: number;
    title: string;
  }[]>([])

  const [currentlyReading, setCurrentlyReading] = useState<{
    author: string; id: string;
    rating: number;
    title: string;
  }[]>([])

  useEffect(() => {
    async function fetchBooks() {
      const data = await getAll()
      const {read, currentlyReading, wantToRead} = splitBooksByShelf(data.books)
      
      const setWantToReadMapped = wantToRead.map((book) => ({
        author: book.authors.join(", "),
        id: book.id,
        rating: book.averageRating,
        title: book.title,
      }))

      setWantToRead(setWantToReadMapped)

      const currentlyReadingMapped = currentlyReading.map((book) => ({
        author: book.authors.join(", "),
        id: book.id,
        rating: book.averageRating,
        title: book.title,
      }))

      setCurrentlyReading(currentlyReadingMapped)


      const readMapped = read.map((book) => ({
        author: book.authors.join(", "),
        id: book.id,
        rating: book.averageRating,
        title: book.title,
      }))
      
      setReadBooks(readMapped)
    }
    fetchBooks()
  }, [])


  return (
    <>
      <h3>Currently Reading</h3>
      <BooksList books={currentlyReading} />
      <hr />
      <h3>Want to read</h3>
      <BooksList books={wantToRead} />
      <hr />
      <h3>Read</h3>
      <BooksList books={readBooks} />
    </>
  )
}

export default HomePage;
