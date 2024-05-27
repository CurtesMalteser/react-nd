import { isAuthed } from "../features/authedUser/authedUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Navigate } from "react-router-dom";
import { fetchQuestions, newQuestions as newQuestionsReducer, answeredQuestions } from "../features/questions/questionsSlice";
import { useEffect } from "react";


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
        <>
            <h1>Home Page</h1>
            <br />
            <h2>New Questions</h2>
            {newQuestions.map((question) => (
                <div key={question.id}>
                    <h3>{question.author}</h3>
                </div>
            ))}
            <br />
            <h2>Done</h2>
            {doneQuestions.map((question) => (
                <div key={question.id}>
                    <h3>{question.author}</h3>
                </div>
            ))}
        </>
    );
}