import { useState } from 'react';
import { search } from '../utils/BooksAPI';
import BookShelf from '../components/books/BookShelf';
import Book from '../components/books/Book';
import Container from 'react-bootstrap/Container';


function BookSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);

    const searchHandler = async (searchTerm: string) => {
        setSearchTerm(searchTerm)
        try {
            const response = await search(searchTerm, 100);

            if (response?.error || response?.items === 0) {
                setSearchResults([]);
            } else {
                setSearchResults(response);
            }
        } catch (error) {
            setSearchResults([]);
        }
    };

    return (
        <Container style={{ marginTop: 20, marginBottom: 20, }}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => searchHandler(e.target.value)}
            />
            <button onClick={() => searchHandler(searchTerm)}>Search</button>
           {(searchResults.length > 0) && <BookShelf title={`Search Results: ${searchResults.length}`} books={searchResults} />}
        </Container>
    );
};

export default BookSearch;