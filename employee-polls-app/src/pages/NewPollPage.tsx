import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppSelector } from "../app/hooks";
import { userID as userIDSelector } from "../features/authedUser/authedUserSlice";

function PollForm({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{label}</Form.Label>
            <Form.Control type="text" placeholder={placeholder} />
        </Form.Group>
    )
}

function NewPollPage() {

    const userID = useAppSelector(userIDSelector);


    const handleSubmit = () => {
        console.log("setting up new poll page")
    }

    //if (questionStatus === 'loading') { return <ComponentLoader /> }

    return (
        <Container className="md-6" style={{ marginTop: 20, marginBottom: 20, marginLeft: "auto", marginRight: "auto" }} >
            <Col>
                <Row style={{ marginBottom: "48px" }}>
                    <h2 className="d-flex justify-content-center">Would you rather</h2>
                    <p className="d-flex justify-content-center">Would you rather</p>
                </Row>
                <Row>
                    <Form>
                        <PollForm label="First Option" placeholder="Option One" />
                        <PollForm label="Second Option"placeholder="Option Two" />
                        <Button disabled variant="primary" onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    );
}

export default NewPollPage;