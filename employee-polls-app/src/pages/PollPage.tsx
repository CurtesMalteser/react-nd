import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useAppSelector } from "../app/hooks";
import { userID, userAvatarURL } from "../features/authedUser/authedUserSlice";
import getAvatarImage from "../utils/avatar";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function PollOption({ option }: { option: string }) {
    return (
        <Col >
            <Card border="success">
            <Card.Body>
            <Card.Title>{option}</Card.Title>
            <Button className="w-100" variant="success">Hide</Button>
            </Card.Body>
            </Card>
        </Col>
    );
}

function PollPage() {

    const { id } = useParams<{ id: string }>();

    const isLoggedIn = useAppSelector(userID);
    const avatarURL = useAppSelector(userAvatarURL);

    console.log(id);

    return (
        <Container className="md-6" style={{ marginTop: 20, marginBottom: 20, marginLeft: "auto", marginRight: "auto" }} >
            <Col>
                <Row style={{ marginBottom: "48px" }}>
                    <h2 className="d-flex justify-content-center">Poll by {isLoggedIn}</h2>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Image
                        src={getAvatarImage(avatarURL)}
                        style={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '400px' }}
                        roundedCircle
                    />
                </Row>
                <Row style={{
                    marginTop: "48px", marginBottom: "48px"
                }}>
                    <h2 className="d-flex justify-content-center">Would you rather</h2>
                </Row>
                <Row >
                    <PollOption option="option 1"/>
                    <PollOption option="option 2"/>
                </Row>
            </Col>
        </Container>
    );
}

export default PollPage;