import { useLoaderData } from "react-router-dom";
import { getBook } from "../utils/BooksAPI";
import Container from 'react-bootstrap/Container';
import Book from "../components/books/Book";
import { IdentifierType } from "../components/books/Book";

function BookIdentifierType(isbn: { type: string, identifier: string }) {
    const type = IdentifierType[`${isbn.type}` as keyof typeof IdentifierType]
    return <p><b>{type}:</b> {isbn.identifier}</p>
}

function BookDetails() {

    const book = useLoaderData() as Book;
    const authorLabel = () => book.authors.length > 1 ? "Authors" : "Author";
    const categoryLabel = () => book.categories!.length > 1 ? "Categories" : "Category";

    return (
        <Container style={{ marginTop: 20, marginBottom: 20, }}>
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <p><b>{authorLabel()}:</b> {book.authors.join(", ")}</p>
            {book.categories && <p><b>{categoryLabel()}:</b> {book.categories.join(", ")}</p>}
            {book.industryIdentifiers.map((isbn) => BookIdentifierType(isbn))}
        </Container>
    );
};

export default BookDetails;

export async function loader({ request, params }: { request: any, params: any }) {
    const book = await getBook(params.id)
    return book
}