import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Question from "../../utils/question";
import QuestionCard from "./QuestionCard";
import NoQuestionsPlaceholder from "./NoQuestionsPlaceholder";

function QuestionsBoard({ title, questions }: { title: string, questions: Question[] }) {
    return (
        <Row className="mb-4">
            <h2>{title}</h2>
            {questions.length === 0
                ? <NoQuestionsPlaceholder />
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