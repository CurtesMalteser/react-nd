import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function BooksList({ books }: { books: Array<{ author: string, id: string, rating: number, title: string }> }) {
    return (
        <Container style={{marginTop: 20, marginBottom: 20, }}>
            <Row xs={1} md={2} className="g-4">
                {books.map((book) => {
                    const content = <Col key={book.id}>
                        <Card border="primary" style={{padding: '20px'}}>
                            <Card.Img variant="top" src='/book-placeholder.svg' style={{width: '18rem'}} />
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>{book.author}</Card.Text>
                                <Link to={`/book/${book.id}`}>
                                    <Button variant="primary">Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    return content
                })}
            </Row>
        </Container>
    );
}

export default BooksList;