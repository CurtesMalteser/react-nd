import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from './_DATA';

describe('_DATA', () => {

    // #region _saveQuestion
    // The following two unit tests must be present for _saveQuestion():

    // An async unit test to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.
    // An async unit test to verify that an error is returned if incorrect data is passed to the function.
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
            .toMatch('Please provide authedUser, qid, and answer')
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