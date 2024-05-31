import { useEffect } from "react";
import { isAuthed } from "../features/authedUser/authedUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
import {
    fetchQuestions,
    newQuestions as newQuestionsReducer,
    answeredQuestions,
    status as fetchQuestionsStatus,
} from "../features/questions/questionsSlice";
import QuestionsBoard from "../components/QestionsBoard";
import { Col, Container, Row } from "react-bootstrap";
import Lottie from "lottie-react";
import animationData from '../assets/lotties/loader.json';

function Loader() {
    return (
        <Container className="d-flex align-items-center" style={{ width: '100vw', height: '100vh' }}>
            <Col>
                <Row><h2 className="d-flex justify-content-center ">Loading...</h2></Row>
                <Row className="d-flex justify-content-center ">
                    <Lottie

                        style={{ height: '180px', width: '180px' }}
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        rendererSettings={
                            {
                                preserveAspectRatio: "xMidYMid slice"
                            }
                        }
                    />
                </Row>
            </Col>
        </Container>
    );
}

export default function HomePage() {

    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(isAuthed);
    const newQuestions = useAppSelector(newQuestionsReducer);
    const doneQuestions = useAppSelector(answeredQuestions);
    const questionStatus = useAppSelector(fetchQuestionsStatus);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    if (!isLoggedIn) { return <Navigate to={'login'} /> }

    if (questionStatus === 'loading') {
        return <Loader />
    }

    return (
        <Container>
            <QuestionsBoard title="New Questions" questions={newQuestions} />
            <QuestionsBoard title="Done" questions={doneQuestions} />
        </Container>
    );
}