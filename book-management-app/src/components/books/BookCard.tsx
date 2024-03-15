import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Book from './Book';


function BookCard(book: Book) {
    return (
        <Card border="primary" style={{ padding: '20px' }}>
            <Card.Img variant="top" src='/book-placeholder.svg' style={{ width: '18rem' }} />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.authors.join(', ')}</Card.Text>
                <Link to={`/book/${book.id}`}>
                    <Button variant="primary">Details</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default BookCard;