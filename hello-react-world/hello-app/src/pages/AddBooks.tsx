import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

function AddBooks() {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleTitleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setBookTitle(e.target.value);
    };

    const handleAuthorChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setAuthor(e.target.value);
    };

    const handleAddBook = () => {
        // Add your logic here to post book to the server
        console.log('Book added:', bookTitle, 'by', author);

        // Implement form validation here
        // Reset the input fields if request is successful
        setBookTitle('');
        setAuthor('');
    };

    return (
        <Container style={{ marginTop: 20, marginBottom: 20, }}>
            <input type="text" value={bookTitle} onChange={handleTitleChange} placeholder="Enter book title" />
            <input type="text" value={author} onChange={handleAuthorChange} placeholder="Enter author" />
            <button onClick={handleAddBook}>Add Book</button>
        </Container>
    );
}

export default AddBooks;