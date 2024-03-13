import { useLoaderData } from "react-router-dom";
import { getBook } from "../utils/BooksAPI";
import Container from 'react-bootstrap/Container';
import Book from "../components/books/Book";
import BookIdentifierType from "../components/books/BookIdentifierType";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookRating from "../components/books/BookRating";




function BookDetails() {

    const book = useLoaderData() as Book;
    const authorLabel = () => book.authors.length > 1 ? "Authors" : "Author";
    const categoryLabel = () => book.categories!.length > 1 ? "Categories" : "Category";

    return (
        <Container className="md-6" style={{ marginTop: 20, marginBottom: 20, marginLeft: "auto", marginRight: "auto" }} >
            <Row md={8}>
                <Col sm={12} md={6} lg={4}>
                    <img style={{ height: 380 }} src={book.imageLinks.thumbnail} alt={book.title} />
                </Col>
                <Col>
                    <h2>{book.title}</h2>
                    <h3>{book.subtitle}</h3>
                    <p><b>{authorLabel()}:</b> {book.authors.join(", ")}</p>
                    <BookRating rating={book.averageRating} ratingsCount={book.ratingsCount} />
                    <hr />
                    <p>
                        {book.description}
                    </p>
                    <hr />
                    <p>
                        {book.categories && <div><b>{categoryLabel()}:</b> {book.categories.join(", ")}</div>}
                        {book.publisher && <><b>Publisher:</b> {book.publisher} <br /></>}
                        <b>Published Date:</b> {book.publishedDate} <br />
                        <b>Page Count:</b> {book.pageCount}
                        {book.industryIdentifiers.map((isbn) => BookIdentifierType(isbn))}
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetails;

export async function loader({ request, params }: { request: any, params: any }) {
    return await getBook(params.id)
}