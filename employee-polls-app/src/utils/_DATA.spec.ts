import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer,
} from './_DATA';
import Question from './question';

describe('_DATA', () => {

    // #region _saveQuestion
    // The following two unit tests must be present for _saveQuestion():
    // Required: An async unit test to verify that the saved question is returned and all expected fields are populated
    // when correctly formatted data is passed to the function.
    it('should return the saved question and all expected fields are populated when correctly formatted data is passed to the function', async () => {
        const expectedQuestion = {
            author: 'johndoe',
            optionOne: 'Be a superhero',
            optionTwo: 'Be a supervillain',
        };

        const response = await _saveQuestion(expectedQuestion);

        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('optionOne');
        expect(response).toHaveProperty('optionTwo');
        expect(response).toHaveProperty('author');

        const question: Question = response as Question;

        // Checking if it is a string,
        // it's not possible to know the correct value since the id is private implementation.
        expect(typeof question.id).toBe('string');
        expect(question.optionOne.text).toEqual(expectedQuestion.optionOne);
        expect(question.optionOne.votes.length).toEqual(0);
        expect(question.optionTwo.text).toBe(expectedQuestion.optionTwo);
        expect(question.optionTwo.votes.length).toEqual(0);
        expect(question.author).toEqual(expectedQuestion.author);
    });

    // Required: An async unit test to verify that an error is returned if incorrect data is passed to the function.
    it('should return error when data passed to the function is incorrect', async () => {
        await expect(_saveQuestion({ optionOne: null, optionTwo: null, author: null }))
            .rejects
            .toEqual('Please provide optionOneText, optionTwoText, and author');
    });

    it('should throw if the author is not an existing user', async () => {
        const expectedQuestion = {
            author: 'unknownUser',
            optionOne: 'Be a superhero',
            optionTwo: 'Be a supervillain',
        };

        await expect(_saveQuestion(expectedQuestion))
            .rejects
            .toThrow('The author is not an existing user');

    });
    // #endregion _saveQuestion

    // #region _saveQuestionAnswer
    // The following two unit tests must be present for _saveQuestionAnswer():
    // Required: An async unit test to verify that true is returned when correctly formatted data is passed to the function.
    it('should return true when correctly formatted data is passed to the function', async () => {
        const response = await _saveQuestionAnswer({ authedUser: 'johndoe', qid: 'vthrdm985a262al8qx3do', answer: 'optionOne' });
        expect(response).toBe(true);
    });

    // Required: An async unit test to verify that an error is returned if incorrect data is passed to the function.
    it('should return error when data passed to the function is incorrect', async () => {
        await expect(_saveQuestionAnswer({ authedUser: 'johndoe', qid: null, answer: 'optionOne' }))
            .rejects
            .toEqual('Please provide authedUser, qid, and answer')
    });

    it('should throw error when the qid is undefined', async () => {
        const errorMatcher: RegExp = /There was an error saving the answer for user .+ and question .+:/;
        await expect(_saveQuestionAnswer({ authedUser: 'johndoe', qid: '1', answer: 'optionOne' }))
            .rejects
            .toThrow(errorMatcher);
    });

    it('should throw error when the user is undefined', async () => {
        const errorMatcher: RegExp = /There was an error saving the answer for user .+ and question .+:/;
        await expect(_saveQuestionAnswer({ authedUser: '1', qid: 'vthrdm985a262al8qx3do', answer: 'optionOne' }))
            .rejects
            .toThrow(errorMatcher);
    });
    // #endregion _saveQuestionAnswer
});