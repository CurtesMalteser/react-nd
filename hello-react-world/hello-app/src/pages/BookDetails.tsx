import { useLoaderData } from "react-router-dom";
import { getBook } from "../utils/BooksAPI";
import Container from 'react-bootstrap/Container';


function BookDetails() {

    const book = useLoaderData() as { author: string, id: string, rating: number, title: string };

    return (
        <Container style={{marginTop: 20, marginBottom: 20, }}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
        </Container>
    );
};

export default BookDetails;

export async function loader({ request, params }: { request: any, params: any }) {
    const book = await getBook(params.id)
    return book
}