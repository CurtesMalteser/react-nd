import { Col, Row } from "react-bootstrap";
import Question from "../utils/question";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function QuestionCard({ author, questionId }: { author: string, questionId: string }) {
    return (
        <Card key={questionId} style={{ width: '18rem' }} border="success" >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{author}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary" onClick={() => console.log(`🚀 clicked: ${questionId}`)}>Show</Button>
            </Card.Body>
        </Card>
    );
}

function QuestionsBoard({ title, questions }: { title: string, questions: Question[] }) {
    return (
        <Row>
            <h2>{title}</h2>
            {
                questions.map((question, index) => (
                    <Col className='d-flex' sm={3} key={index}>
                        <QuestionCard author={question.author} questionId={question.id} />
                    </Col>
                ))
            }
        </Row>
    )
}


export default QuestionsBoard;