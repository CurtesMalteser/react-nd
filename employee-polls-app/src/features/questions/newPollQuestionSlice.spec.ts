import { configureStore } from '@reduxjs/toolkit';
import newPollQuestionReducer, {
    QuestionsState,
    updateOptionOne,
    updateOptionTwo,
    updateAuthor,
    isValid,
    postNewPoll
} from './newPollQuestionSlice';
import getDefaultState from '../testUtils';


describe('newPollQuestionSlice', () => {

    const initialState: QuestionsState = {
        question: { optionOne: '', optionTwo: '', author: '' },
        status: 'idle',
    };

    it('should handle initial state', () => {
        expect(newPollQuestionReducer(undefined, { type: 'unknown' })).toEqual(
            {
                question: { optionOne: '', optionTwo: '', author: '' },
                status: 'idle',
            }
        );
    });

    // #endregion update functions
    it('should handle updateOptionOne', () => {
        const actual = newPollQuestionReducer(initialState, updateOptionOne('optionOne'));
        expect(actual.question.optionOne).toEqual('optionOne');
    });

    it('should handle updateOptionTwo', () => {
        const actual = newPollQuestionReducer(initialState, updateOptionTwo('optionTwo'));
        expect(actual.question.optionTwo).toEqual('optionTwo');
    });

    it('should handle updateAuthor', () => {
        const actual = newPollQuestionReducer(initialState, updateAuthor('author'));
        expect(actual.question.author).toEqual('author');
    });
    // #endregion update functions

    // #region isValid
    it('should handle isValid is false', () => {
        const state = getDefaultState();

        newPollQuestionReducer(initialState, updateOptionOne('optionOne'));

        expect(isValid(state)).toEqual(false);
    });

    it('should handle isValid is true', () => {
        const state = getDefaultState(
            {
                newPollState: {
                    question: { optionOne: 'optionOne', optionTwo: 'optionTwo', author: 'author' },
                    status: 'idle' as const,
                }
            }
        );

        newPollQuestionReducer(initialState, updateOptionOne('optionOne'));

        expect(isValid(state)).toEqual(true);
    });
    // #endregion isValid

    // #region postNewPoll
     it('should handle dispatch postNewPoll loading', () => {
        const store = configureStore({ reducer: newPollQuestionReducer });
    
        store.dispatch(postNewPoll.pending('requestId', initialState.question));

        const actual = store.getState();

        expect(actual.status).toEqual('loading');
    });

    it('should handle dispatch postNewPoll idle', () => {
        const store = configureStore({ reducer: newPollQuestionReducer });
    
        store.dispatch(postNewPoll.fulfilled({ optionOne: 'optionOne', optionTwo: 'optionTwo', author: 'author' }, 'requestId', initialState.question));

        const actual = store.getState();

        expect(actual.status).toEqual('idle');
    });

    it('should handle dispatch postNewPoll failed', () => {
        const store = configureStore({ reducer: newPollQuestionReducer });
    
        store.dispatch(postNewPoll.rejected(new Error('Rejected to post new poll'), 'requestId', initialState.question));

        const actual = store.getState();

        expect(actual.status).toEqual('failed');
    });
    // #endregion postNewPoll

});