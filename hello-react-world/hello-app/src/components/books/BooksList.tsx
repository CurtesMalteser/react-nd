export function BooksList({ books }: { books: Array<{ author: string, id: string, rating: number, title: string }> }) {
    return (
        <ul>
            {books.map((book) => <li key={book.id}>{book.title}</li>)}
        </ul>
    );
}