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
    getQuestionByID,
    status as fetchQuestionsStatus,
    fetchQuestionByID,
} from "../features/questions/questionsSlice";
import { useEffect } from "react";
import Option from "../utils/option";
import ComponentLoader from "../components/loader/ComponentLoader";
import { postAnswer } from "../features/questions/answerQuestionSlice";
import { authedUser as authedUserSelector } from "../features/authedUser/authedUserSlice";
import Answer from "../utils/answer";
import User from "../utils/user";
import useRequireAuth from "../hooks/useRequireAuth";
import NoQuestionFound404 from "../components/NoQuestionFound404";

const safeOption: Option = { text: "Safe option", votes: [] };

function PollOption({ option, clickHandler }: { option: Option, clickHandler: () => void }) {
    return (
        <Col >
            <Card border="success">
                <Card.Body>
                    <Card.Title className="d-flex justify-content-center">{option.text}</Card.Title>
                    <Button className="w-100" variant="success" onClick={clickHandler}>Click</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

function PollPage() {

    const { id } = useParams<{ id: string }>();

    useRequireAuth();

    const dispatch = useAppDispatch();

    const question = useAppSelector((state) => getQuestionByID(state, id as string));
    const questionStatus = useAppSelector(fetchQuestionsStatus);
    const authedUser = useAppSelector(authedUserSelector);

    useEffect(() => { dispatch(fetchQuestionByID(id as string)) }, [dispatch, id]);

    const handleOptionClick = (answer: Answer, authedUser: User | null) => {
        authedUser && dispatch(postAnswer({ authedUser, answer, }));
    }

    if (questionStatus === 'loading') { return <ComponentLoader /> }

    if (questionStatus === 'failed') { return <NoQuestionFound404 /> }

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
                        clickHandler={() => handleOptionClick({ [id as string]: 'optionOne' }, authedUser)}
                        option={question?.optionOne ?? safeOption}
                    />
                    <PollOption
                        clickHandler={() => handleOptionClick({ [id as string]: 'optionTwo' }, authedUser)}
                        option={question?.optionTwo ?? safeOption}
                    />
                </Row>
            </Col>
        </Container>
    );
}

export default PollPage;