import Book from "../components/books/Book";

function splitBooksByShelf(books: Book[]) {
    const sortedBooks = {
        read: Array<Book>(),
        currentlyReading: Array<Book>(),
        wantToRead: Array<Book>()
    };

    books.forEach(book => {
        switch (book.shelf) {
            case 'read':
                sortedBooks.read.push(book);
                break;
            case 'currentlyReading':
                sortedBooks.currentlyReading.push(book);
                break;
            case 'wantToRead':
                sortedBooks.wantToRead.push(book);
                break;
            }
    });

    return sortedBooks;
}

export default splitBooksByShelf;