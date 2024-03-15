
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Book from './Book';
import BookCard from './BookCard';


function BookShelf({ title, books }: { title: string, books: Array<Book> }) {
    return (
        <div>
            <h3 style={{ paddingBottom: '20px' }}>{title}</h3>
            <Row xs={1} md={2} className="g-4" style={{ paddingBottom: '20px' }}>
                {books.map((book) => <Col key={book.id}>{BookCard(book)}</Col>)}
            </Row>
            <hr />
        </div>
    )
}

export default BookShelf;
