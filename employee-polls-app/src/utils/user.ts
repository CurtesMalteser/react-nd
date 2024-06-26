import Answer from "./answer";

export default interface User {
    id: string;
    name: string;
    avatarURL: string | null;
    answers: Answer;
    questions: string[];
}

export interface UserServer extends User {
    password: string;
}