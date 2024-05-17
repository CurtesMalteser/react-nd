import Option from "./option";

export default interface Question {
    id: string;
    author: string;
    timestamp: number;
    optionOne: Option;
    optionTwo: Option;
}