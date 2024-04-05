import { createContext } from "react";
import Book from "../components/books/Book";

export const BookShelfContext = createContext({
  books: Array<Book>(),
  setBooks: (books: Array<Book>) => { },
  addToShelf: (book: Book) => { },
});
