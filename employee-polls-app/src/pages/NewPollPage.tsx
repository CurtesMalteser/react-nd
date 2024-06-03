import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useAppSelector } from "../app/hooks";
import Button from 'react-bootstrap/Button';
import { userID as userIDSelector } from "../features/authedUser/authedUserSlice";

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
                    {userID && <div>{userID}</div>}
                    <Button disabled variant="primary" onClick={handleSubmit}>Submit</Button>
                </Row>
            </Col>
        </Container>
    );
}

export default NewPollPage;