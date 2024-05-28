import { useEffect } from "react";
import { isAuthed } from "../features/authedUser/authedUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
import { fetchQuestions, newQuestions as newQuestionsReducer, answeredQuestions } from "../features/questions/questionsSlice";
import QuestionsBoard from "../components/QestionsBoard";
import { Container } from "react-bootstrap";

export default function HomePage() {

    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(isAuthed);
    const newQuestions = useAppSelector(newQuestionsReducer);
    const doneQuestions = useAppSelector(answeredQuestions);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={'login'} />
    }

    return (
        <Container>
            <QuestionsBoard title="New Questions" questions={newQuestions} />
            <br />
            <QuestionsBoard title="Done" questions={doneQuestions} />
        </Container>
    );
}