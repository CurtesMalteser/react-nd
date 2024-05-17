import Answer from "./answer";

export default interface User {
    id: string;
    name: string;
    avatarURL: string;
    answers: Answer;
    questions: string[];
}