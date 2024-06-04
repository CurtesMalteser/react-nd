import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { userID as userIDSelector } from "../features/authedUser/authedUserSlice";
import { status as  submitPollStatus} from "../features/questions/newPollQuestionSlice";
import ComponentLoader from "../components/loader/ComponentLoader";

function PollForm({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder={placeholder}
            />
        </Form.Group>
    )
}

function NewPollPage() {

    const userID = useAppSelector(userIDSelector);
    const status = useAppSelector(submitPollStatus);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
    
        setValidated(true);
    }

    if (status === 'loading') { return <ComponentLoader /> }

    return (
        <Container className="md-6" style={{ marginTop: 20, marginBottom: 20, marginLeft: "auto", marginRight: "auto" }} >
            <Col>
                <Row style={{ marginBottom: "48px" }}>
                    <h2 className="d-flex justify-content-center">Would you rather</h2>
                    <p className="d-flex justify-content-center">Would you rather</p>
                </Row>
                <Row>
                    <Form validated={validated} onSubmit={handleSubmit}>
                        <PollForm label="First Option" placeholder="Option One" />
                        <PollForm label="Second Option" placeholder="Option Two" />
                        <Button type="submit" variant="primary" onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    );
}

export default NewPollPage;