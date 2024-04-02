import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Book from './Book';


function BookCard(book: Book) {
    const bookCover = book.imageLinks ? book.imageLinks.thumbnail : '/book-placeholder.svg';
    const authors = book.authors ? book.authors.join(', ') : 'N/A';
    return (
        <Card border="primary" style={{ padding: '20px' }}>
            <Card.Img variant="top" src={bookCover} style={{ objectFit: 'contain', height: 380 }} />
            <Card.Body>
                <Card.Title className='oneLine'>{book.title}</Card.Title>
                <Card.Text className='oneLine'>{authors}</Card.Text>
                <Link to={`/book/${book.id}`}><Button variant="primary">Details</Button></Link>
            </Card.Body>
        </Card>
    )
}

export default BookCard;