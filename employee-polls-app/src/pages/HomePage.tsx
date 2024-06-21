import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    fetchQuestions,
    newQuestions as newQuestionsReducer,
    answeredQuestions,
    status as fetchQuestionsStatus,
    questionsFilter as questionsFilterSelector,
} from "../features/questions/questionsSlice";
import QuestionsBoard from "../components/QestionsBoard";
import { Container } from "react-bootstrap";
import ComponentLoader from "../components/loader/ComponentLoader";
import QuestionBoardFilter from "../components/question/QuestionBoardFilter";

export default function HomePage() {

    const dispatch = useAppDispatch();
    const newQuestions = useAppSelector(newQuestionsReducer);
    const doneQuestions = useAppSelector(answeredQuestions);
    const questionFilter = useAppSelector(questionsFilterSelector);
    const questionStatus = useAppSelector(fetchQuestionsStatus);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    if (questionStatus === 'loading') { return <ComponentLoader /> }

    return (
        <Container>
            <QuestionBoardFilter />
            { (questionFilter === 'all' || questionFilter === 'new' ) &&  <QuestionsBoard title="New Questions" questions={newQuestions} />}
            { (questionFilter === 'all' || questionFilter === 'answered' ) && <QuestionsBoard title="Done" questions={doneQuestions} /> }
        </Container>
    );
}