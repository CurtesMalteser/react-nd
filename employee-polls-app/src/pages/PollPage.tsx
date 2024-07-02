import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import getAvatarImage from "../utils/avatar";
import { useParams } from "react-router-dom";
import {
    getQuestionByID,
    status as fetchQuestionsStatus,
    fetchQuestionByID,
} from "../features/questions/questionsSlice";
import { useCallback, useEffect, useState } from "react";
import Option from "../utils/option";
import ComponentLoader from "../components/loader/ComponentLoader";
import {
    postAnswer,
    status as postAnswerStatus,
} from "../features/questions/answerQuestionSlice";
import {
    userID as authedUserIDSelector,
    answer as answerSelector,
    updateUserAnswer,
} from "../features/authedUser/authedUserSlice";
import Answer from "../utils/answer";
import PollOption from "../components/poll/PollOption";
import Question from "../utils/question";
import ErrorComponent from "../components/error/ErrorComponent";
import { store } from "../app/store";

const safeOption: Option = { text: "Safe option", votes: [] };

const getVotes = (question: Question | undefined): {
    votesOptionOne: number,
    votesOptionTwo: number,
    totalVotes: number,
} => {
    const votesOptionOne = question?.optionOne.votes.length ?? 0;
    const votesOptionTwo = question?.optionTwo.votes.length ?? 0;
    const totalVotes = votesOptionOne + votesOptionTwo;
    return { votesOptionOne, votesOptionTwo, totalVotes };
}

function PollPage() {

    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();

    const question = useAppSelector((state) => getQuestionByID(state, id as string));
    const answer = useAppSelector((state) => answerSelector(state, id as string));
    const questionStatus = useAppSelector(fetchQuestionsStatus);
    const answerStatus = useAppSelector(postAnswerStatus);
    const authedUser = useAppSelector(authedUserIDSelector);

    const [votes, setVotes] = useState({ votesOptionOne: 0, votesOptionTwo: 0, totalVotes: 0 });


    const fetchQuestionAsyncByID = useCallback(async () => {
        dispatch(fetchQuestionByID(id as string))
            .then((response) => {
                response.payload && setVotes(getVotes(response.payload as Question));
            });
    }, [dispatch, id]);

    useEffect(() => { fetchQuestionAsyncByID() }, [fetchQuestionAsyncByID]);


    const handleOptionClick = async (answer: Answer, authedUser: string | undefined) => {
        authedUser && dispatch(postAnswer({ userID: authedUser, answer }))
            .then((response) => response.payload && dispatch(updateUserAnswer(answer)))
            .then(() => fetchQuestionAsyncByID());
    }

    if (questionStatus === 'loading' || answerStatus === 'loading') { return <ComponentLoader /> }

    if (questionStatus === 'failed') { return <ErrorComponent />; }

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
                        isSelected={answer === 'optionOne'}
                        votes={{ optionVotes: votes.votesOptionOne, totalVotes: votes.totalVotes }}
                    />
                    <PollOption
                        clickHandler={() => handleOptionClick({ [id as string]: 'optionTwo' }, authedUser)}
                        option={question?.optionTwo ?? safeOption}
                        isSelected={answer === 'optionTwo'}
                        votes={{ optionVotes: votes.votesOptionTwo, totalVotes: votes.totalVotes }}
                    />
                </Row>
            </Col>
        </Container>
    );
}

export default PollPage;

export async function loader({ params }: { params: any }) {    
    return store.dispatch(fetchQuestionByID(params.id)).then(() => {
        const question = getQuestionByID(store.getState(), params.id);
        // !! is used to assert that question is not undefined, on error it should show the error page
        return  question!!.id;
    });
}