import { configureStore } from '@reduxjs/toolkit';
import questionsReducer, {
    QuestionsState,
    fetchQuestions,
    answeredQuestions,
    newQuestions,
} from './questionsSlice';
import Question from '../../utils/question';
import getDefaultState from '../testUtils';
import User from '../../utils/user';

const loggedInUser: User = {
    id: 'johndoe',
    name: 'John Doe',
    avatarURL: 'johndoe.jpg',
    answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
        "vthrdm985a262al8qx3do": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
}

const loggedInUserAnsweredQuestion: Question = {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: { votes: [], text: 'become a superhero' },
    optionTwo: {
        votes: ['johndoe', 'sarahedo'],
        text: 'become a supervillian',
    },

}

const mockQuestionsPayload: Question[] = [
    loggedInUserAnsweredQuestion,
    {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'johndoe',
        timestamp: 1493579767190,
        optionOne: {
            votes: [],
            text: 'write JavaScript',
        },
        optionTwo: {
            votes: [],
            text: 'write Swift'
        }
    },
    {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'sarahedo',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'be telekinetic',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be telepathic'
        }
    },
];

describe('questionsSlice', () => {

    const initialState: QuestionsState = {
        questions: [],
        status: 'idle',
    };

    it('should handle initial state', () => {
        expect(questionsReducer(undefined, { type: 'unknown' })).toEqual(
            {
                questions: [],
                status: 'idle',
            }
        );
    });

    // #region fetchQuestions
    it('should handle dispatch fetchQuestions loading', () => {
        const store = configureStore({ reducer: questionsReducer });

        store.dispatch(fetchQuestions.pending('requestId'));

        const actual = store.getState();

        expect(actual.status).toEqual('loading');
    });

    it('should handle dispatch fetchQuestions idle, fullfiled allQuestions', () => {

        const store = configureStore({ reducer: questionsReducer });

        store.dispatch(fetchQuestions.fulfilled(mockQuestionsPayload, 'requestId'));

        const actual = store.getState();

        // Check if the questions payload is dispatched correctly
        expect(actual.questions).toEqual(mockQuestionsPayload);
        expect(actual.status).toEqual('idle');
    });

    it('should handle dispatch fetchQuestions failed', () => {
        const store = configureStore({ reducer: questionsReducer });

        store.dispatch(fetchQuestions.rejected(new Error('Rejected to post new poll'), 'requestId'));

        const actual = store.getState();

        expect(actual.status).toEqual('failed');
    });
    // #endregion fetchQuestions

    // #region fetch answered questions
    it('answeredQuestions returns all questions that contains answers', () => {
        const mockStateOverrides = getDefaultState({
            authedUser: {
                user: null,
                loggedIn: false,
                status: 'idle',
                loginError: false,
            },
            questionsState: {
                questions: mockQuestionsPayload,
                status: 'idle',
            },
        });

        const actualAnsweredQuestions = answeredQuestions(mockStateOverrides);

        expect(actualAnsweredQuestions).toEqual([
            loggedInUserAnsweredQuestion,
            {
                id: 'am8ehyc8byjqgar0jgpub9',
                author: 'sarahedo',
                timestamp: 1488579767190,
                optionOne: {
                    votes: [],
                    text: 'be telekinetic',
                },
                optionTwo: {
                    votes: ['sarahedo'],
                    text: 'be telepathic'
                }
            },]);
    });

    it('answeredQuestions returns only questions answered by the logged in user', () => {

        const mockStateOverrides = getDefaultState({
            authedUser: {
                user: loggedInUser,
                loggedIn: true,
                status: 'idle',
                loginError: false,
            },
            questionsState: {
                questions: mockQuestionsPayload,
                status: 'idle',
            },
        });

        const actualAnsweredQuestions = answeredQuestions(mockStateOverrides);

        expect(actualAnsweredQuestions).toEqual([loggedInUserAnsweredQuestion]);
    });
    // #endregion fetch answered questions

    // #region fetch new questions
    it('answeredQuestions returns all new unanswered questions', () => {
        const mockStateOverrides = getDefaultState({
            authedUser: {
                user: null,
                loggedIn: false,
                status: 'idle',
                loginError: false,
            },
            questionsState: {
                questions: mockQuestionsPayload,
                status: 'idle',
            },
        });

        const actualAnsweredQuestions = newQuestions(mockStateOverrides);

        expect(actualAnsweredQuestions).toEqual([
            {
                id: 'xj352vofupe1dqz9emx13r',
                author: 'johndoe',
                timestamp: 1493579767190,
                optionOne: {
                    votes: [],
                    text: 'write JavaScript',
                },
                optionTwo: {
                    votes: [],
                    text: 'write Swift'
                }
            }]);
    });

    it('answeredQuestions returns only new questions unanswered by the logged in user', () => {

        const mockStateOverrides = getDefaultState({
            authedUser: {
                user: loggedInUser,
                loggedIn: true,
                status: 'idle',
                loginError: false,
            },
            questionsState: {
                questions: mockQuestionsPayload,
                status: 'idle',
            },
        });

        const actualAnsweredQuestions = newQuestions(mockStateOverrides);

        expect(actualAnsweredQuestions).toEqual([
            {
                id: 'xj352vofupe1dqz9emx13r',
                author: 'johndoe',
                timestamp: 1493579767190,
                optionOne: {
                    votes: [],
                    text: 'write JavaScript',
                },
                optionTwo: {
                    votes: [],
                    text: 'write Swift'
                }
            },
            {
                id: 'am8ehyc8byjqgar0jgpub9',
                author: 'sarahedo',
                timestamp: 1488579767190,
                optionOne: {
                    votes: [],
                    text: 'be telekinetic',
                },
                optionTwo: {
                    votes: ['sarahedo'],
                    text: 'be telepathic'
                }
            }]);
    });
    // #endregion fetch new questions

});