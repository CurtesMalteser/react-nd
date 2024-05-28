import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import getAvatarImage from "../utils/avatar";

function QuestionCard({ questionId, author, timestamp }: { questionId: string, author: string, timestamp: number }) {
    return (
        <Card key={questionId} style={{ width: '18rem' }} border="success" >
            <Card.Img variant="top" src={getAvatarImage(`${author}.jpg`)} />
            <Card.Body>
                <Card.Title>{author}</Card.Title>
                <Card.Text>{timestamp}</Card.Text>
                <Button className="align-self-end" variant="success" onClick={() => console.log(`🚀 clicked: ${questionId}`)}>Show</Button>
            </Card.Body>
        </Card>
    );
}

export default QuestionCard;