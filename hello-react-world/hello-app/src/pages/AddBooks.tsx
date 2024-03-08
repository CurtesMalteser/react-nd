import { useState, FormEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormSelect from 'react-bootstrap/FormSelect'
import { addBook } from '../utils/BooksAPI';


function AddBooks() {

    const [validated, setValidated] = useState(false);


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        console.log(`Form submitted! Rating: > ${form.formRating.value}`);
        async function postBook() {
            const data = await addBook({
                title: form.formTitle.value,
                author: form.formAuthor.value,
                id: form.formISBN.value,
                rating: form.formRating.value
            })
            if(data.success)   {
                console.log('Book added successfully:\n' + data.book);
                setValidated(false);
                form.reset()
            }
        }
        
        event.preventDefault()

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true);
        } else {
            postBook()
        }
    };

    return (
        <Container style={{ marginTop: '20px', marginBottom: '20', }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control required type="text" placeholder="Enter author" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formISBN">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" placeholder="Enter ISBN" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <FormSelect required aria-label="Default select example">
                            <option value="">---</option>
                            <option value="1">One out of Five</option>
                            <option value="2">Two out of Five</option>
                            <option value="3">Three out of Five</option>
                            <option value="4">Four out of Five</option>
                            <option value="5">Five out of Five</option>
                        </FormSelect>
                    </Form.Group>
                </Row>
                <Button type='submit'>Add Book</Button>
            </Form>
        </Container>
    );
}

export default AddBooks;