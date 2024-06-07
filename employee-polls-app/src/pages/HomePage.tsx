import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    fetchQuestions,
    newQuestions as newQuestionsReducer,
    answeredQuestions,
    status as fetchQuestionsStatus,
} from "../features/questions/questionsSlice";
import QuestionsBoard from "../components/QestionsBoard";
import { Container } from "react-bootstrap";
import ComponentLoader from "../components/loader/ComponentLoader";
import useRequireAuth from "../hooks/useRequireAuth";

export default function HomePage() {

    const dispatch = useAppDispatch();
    const newQuestions = useAppSelector(newQuestionsReducer);
    const doneQuestions = useAppSelector(answeredQuestions);
    const questionStatus = useAppSelector(fetchQuestionsStatus);

    useRequireAuth();

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    if (questionStatus === 'loading') { return <ComponentLoader /> }

    return (
        <Container>
            <QuestionsBoard title="New Questions" questions={newQuestions} />
            <QuestionsBoard title="Done" questions={doneQuestions} />
        </Container>
    );
}