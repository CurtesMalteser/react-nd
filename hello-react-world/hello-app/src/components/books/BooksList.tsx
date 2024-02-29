import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function BooksList({ books }: { books: Array<{ author: string, id: string, rating: number, title: string }> }) {
    return (
        <Container style={{marginTop: 20, marginBottom: 20,}}>
            <Row xs={1} md={2} className="g-4">
                {books.map((book) => {
                    const padding = { padding: 20 }
                    const content = <Col key={book.id}>
                        <Card border="primary" style={padding}>
                            <Card.Img variant="top" src='/book-placeholder.svg' style={padding} />
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>{book.author}</Card.Text>
                                <Button variant="primary">Go somewhere</Button>
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