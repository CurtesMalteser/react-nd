import { useState } from 'react';
import { search } from '../utils/BooksAPI';
import BookShelf from '../components/books/BookShelf';
import Book from '../components/books/Book';


function BookSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);

    const searchHandler = async (searchTerm: string) => {
        setSearchTerm(searchTerm)
        try {
            const response = await search(searchTerm, 100);

            if (response?.error || response?.items === 0) {
                console.error(response.books?.error);
                setSearchResults([]);
            } else {
                console.log("maybe " + response.books?.error);
                console.log("response " + response);
                setSearchResults(response);
            }
        } catch (error) {
            console.error(error);
            setSearchResults([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => searchHandler(e.target.value)}
            />
            <button onClick={() => searchHandler(searchTerm)}>Search</button>
           {(searchResults.length > 0) && <BookShelf title={`Search Results: ${searchResults.length}`} books={searchResults} />}
        </div>
    );
};

export default BookSearch;