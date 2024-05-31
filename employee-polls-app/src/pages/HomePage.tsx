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
import { Container } from "react-bootstrap";
import Loader from "../components/Loader";

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

    if (questionStatus === 'loading') { return <Loader /> }

    return (
        <Container>
            <QuestionsBoard title="New Questions" questions={newQuestions} />
            <QuestionsBoard title="Done" questions={doneQuestions} />
        </Container>
    );
}