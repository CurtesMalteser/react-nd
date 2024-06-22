import { configureStore } from '@reduxjs/toolkit';
import getDefaultState from '../testUtils';
import authedUserReducer, {
    AuthedUserState,
    authedUser as authedUserSelector,
    answer as answerSelector,
} from './authedUserSlice';

describe('counter reducer', () => {

    const authedUser = {
        id: '1', name: 'John Doe', avatarURL: 'avatar.jpg', answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne" as const,
            "loxhs1bqm25b708cmbf3g": "optionTwo" as const
        }, questions: []
    };

    const initialState: AuthedUserState = {
        user: null,
        loggedIn: false,
        status: 'idle',
        loginError: false,
    };

    it('should handle initial state', () => {
        expect(authedUserReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    // #region authedUser selector
    it('should select authedUser', () => {
        const authedUser = { id: '1', name: 'John Doe', avatarURL: 'avatar.jpg', answers: {}, questions: [] };
        const state = getDefaultState({
            authedUser: {
                user: authedUser,
                loggedIn: true,
                status: 'idle',
                loginError: false,
            }
        });

        expect(authedUserSelector(state)).toEqual(authedUser);
    });
    // #endregion authedUser selector

    // #region answer selector
    it('should select correct answer optionOne for question id 8xf0y6ziyjabvozdd253nd', () => {
        const store = configureStore({ reducer: getDefaultState, preloadedState: { authedUser: { user: authedUser, loggedIn: true, status: 'idle', loginError: false } } });
        expect(answerSelector(store.getState(), "8xf0y6ziyjabvozdd253nd")).toEqual("optionOne");
    });

    it('should select correct answer optionTwo for question id loxhs1bqm25b708cmbf3g', () => {
        const store = configureStore({ reducer: getDefaultState, preloadedState: { authedUser: { user: authedUser, loggedIn: true, status: 'idle', loginError: false } } });
        expect(answerSelector(store.getState(), "loxhs1bqm25b708cmbf3g")).toEqual("optionTwo");
    });

    it('should select correct answer optionOne for question id 8xf0y6ziyjabvozdd253nd', () => {
        const store = configureStore({ reducer: getDefaultState, preloadedState: { authedUser: { user: authedUser, loggedIn: true, status: 'idle', loginError: false } } });
        expect(answerSelector(store.getState(), "8xf0y6ziyjabvozdd253nd")).toEqual("optionOne");
    });

    it('should select correct answer undefined for question id which was not answered by the authedUser', () => {
        const authedUser = {
            id: '1', name: 'John Doe', avatarURL: 'avatar.jpg', answers: {
                "8xf0y6ziyjabvozdd253nd": "optionOne" as const,
                "loxhs1bqm25b708cmbf3g": "optionTwo" as const
            }, questions: []
        };

        const store = configureStore({ reducer: getDefaultState, preloadedState: { authedUser: { user: authedUser, loggedIn: true, status: 'idle', loginError: false } } });

        expect(answerSelector(store.getState(), "undefined")).toBeUndefined();
    });
    // #endregion answer selector

});