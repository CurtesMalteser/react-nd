import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import getAvatarImage from "../utils/avatar";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {
    fetchQuestions,
    getQuestionByID,
    status as fetchQuestionsStatus,
} from "../features/questions/questionsSlice";
import { useEffect } from "react";
import Option from "../utils/option";
import ComponentLoader from "../components/loader/ComponentLoader";

function PollOption({ key, option }: { key: string, option: Option }) {

    //type OptionType = typeof option;
    console.log(typeof option)

    return (
        <Col >
            <Card border="success">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-center">{option.text}</Card.Title>
                    <Button className="w-100" variant="success">Click</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

function PollPage() {

    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const question = useAppSelector((state) => getQuestionByID(state, id as string));
    const questionStatus = useAppSelector(fetchQuestionsStatus);

    useEffect(() => { dispatch(fetchQuestions()) }, [dispatch]);

    if (questionStatus === 'loading') { return <ComponentLoader /> }

    return (
        <Container className="md-6" style={{ marginTop: 20, marginBottom: 20, marginLeft: "auto", marginRight: "auto" }} >
            <Col>
                <Row style={{ marginBottom: "48px" }}>
                    <h2 className="d-flex justify-content-center">Poll by {question?.author}</h2>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Image
                        src={getAvatarImage(question?.author + ".jpg")}
                        style={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '400px' }}
                        roundedCircle
                    />
                </Row>
                <Row style={{ marginTop: "48px", marginBottom: "48px" }}>
                    <h2 className="d-flex justify-content-center">Would you rather</h2>
                </Row>
                <Row >
                    <PollOption
                        key="optionOne"
                        option={question?.optionOne ?? { text: "Option One", votes: [] }}
                    />
                    <PollOption
                        key="optionTwo"
                        option={question?.optionTwo ?? { text: "Option Two", votes: [] }}
                    />
                </Row>
            </Col>
        </Container>
    );
}

export default PollPage;