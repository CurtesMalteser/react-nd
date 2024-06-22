import { configureStore } from '@reduxjs/toolkit';
import newPollQuestionReducer, {
    QuestionsState,
    postNewPoll,
} from './newPollQuestionSlice';


describe('newPollQuestionSlice', () => {

    const initialState: QuestionsState = {
        status: 'idle',
    };

    it('should handle initial state', () => {
        expect(newPollQuestionReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    // #region postNewPoll
     it('should handle dispatch postNewPoll loading', () => {
        const store = configureStore({ reducer: newPollQuestionReducer });
    
        store.dispatch(postNewPoll.pending('requestId', { optionOne: 'optionOne', optionTwo: 'optionTwo', author: 'author' }));

        const actual = store.getState();

        expect(actual.status).toEqual('loading');
    });

    it('should handle dispatch postNewPoll idle', () => {
        const store = configureStore({ reducer: newPollQuestionReducer });
    
        store.dispatch(postNewPoll.fulfilled({ optionOne: 'optionOne', optionTwo: 'optionTwo', author: 'author' }, 'requestId', { optionOne: 'optionOne', optionTwo: 'optionTwo', author: 'author' }));

        const actual = store.getState();

        expect(actual.status).toEqual('idle');
    });

    it('should handle dispatch postNewPoll failed', () => {
        const store = configureStore({ reducer: newPollQuestionReducer });
    
        store.dispatch(postNewPoll.rejected(new Error('Rejected to post new poll'), 'requestId', { optionOne: 'optionOne', optionTwo: 'optionTwo', author: 'author' }));

        const actual = store.getState();

        expect(actual.status).toEqual('failed');
    });
    // #endregion postNewPoll

});