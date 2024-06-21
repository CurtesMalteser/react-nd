import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Question from "../utils/question";
import QuestionCard from "./QuestionCard";
import Lottie from "lottie-react";
import animationData from '../assets/lotties/check.json';
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";

function NoQuestionsPlaceholder() {
    const navigate = useNavigate();
    const navigateToNewPool = () => { navigate(ROUTES.NEW_QUESTION) };
    return (
        <Row style={{ marginTop: '20px' }}>
            <Col xs="auto">
                <Lottie
                    style={{
                        height: '180px',
                        width: '180px',

                    }}
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    rendererSettings={
                        {
                            preserveAspectRatio: "xMidYMid slice"
                        }
                    }
                />
            </Col>
            <Col>
                <h4>There are no questions here...</h4>
                <p>Why don't you create a new poll?</p>
                <Button className="w-100" variant="success" onClick={navigateToNewPool} >New Poll</Button>
            </Col>
        </Row>
    )
}
function QuestionsBoard({ title, questions }: { title: string, questions: Question[] }) {
    return (
        <Row className="mb-4">
            <h2>{title}</h2>
            {
                questions.length === 0 ? <NoQuestionsPlaceholder />
                    : questions.map((question, index) => (
                        <Col className='d-flex mb-3' sm={3} key={index}>
                            <QuestionCard author={question.author} questionId={question.id} timestamp={question.timestamp} />
                        </Col>
                    ))
            }
        </Row>
    )
}


export default QuestionsBoard;