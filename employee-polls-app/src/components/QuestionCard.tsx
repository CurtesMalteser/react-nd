import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import getAvatarImage from "../utils/avatar";
import { useNavigate } from 'react-router-dom';
import ROUTES from '../constants/routes';

function QuestionCard({ questionId, author, timestamp }: { questionId: string, author: string, timestamp: number }) {
    const navigate = useNavigate();
    const navigateToAnswerPool = () => { navigate(ROUTES.ANSWER_POOL.replace(':id', questionId)) };

    return (
        <Card key={questionId} style={{ width: '18rem' }} border="success" >
            <Card.Img variant="top" src={getAvatarImage(`${author}.jpg`)} />
            <Card.Body>
                <Card.Title>{author}</Card.Title>
                <Card.Text>{timestamp}</Card.Text>
                <Button className="w-100" variant="success" onClick={navigateToAnswerPool}>Show</Button>
            </Card.Body>
        </Card>
    );
}

export default QuestionCard;