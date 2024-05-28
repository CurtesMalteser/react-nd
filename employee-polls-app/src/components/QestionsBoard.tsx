import { Col, Row } from "react-bootstrap";
import Question from "../utils/question";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function QuestionCard({ questionId, author, timestamp }: { questionId: string, author: string, timestamp: number }) {
    return (
        <Card key={questionId} style={{ width: '18rem' }} border="success" >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{author}</Card.Title>
                <Card.Text>{timestamp}</Card.Text>
                <Button variant="success" onClick={() => console.log(`🚀 clicked: ${questionId}`)}>Show</Button>
            </Card.Body>
        </Card>
    );
}

function QuestionsBoard({ title, questions }: { title: string, questions: Question[] }) {
    return (
        <Row className="mb-4">
            <h2>{title}</h2>
            {
                questions.map((question, index) => (
                    <Col className='d-flex mb-3' sm={3} key={index}>
                        <QuestionCard author={question.author} questionId={question.id} timestamp={question.timestamp} />
                    </Col>
                ))
            }
        </Row>
    )
}


export default QuestionsBoard;