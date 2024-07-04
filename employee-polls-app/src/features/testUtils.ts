import { RootState } from "../app/store";

function getDefaultState(overrides: Partial<RootState> = {}): RootState {
    return {
        users: {
            users: {},
            status: 'idle' as const,
        },
        authedUser: {
            user: null,
            loggedIn: false,
            status: 'idle' as const,
            loginError: false,
        },
        questionsState: {
            questions: [],
            status: 'idle' as const,
            filter: 'all' as const,
        },
        answerState: {
            status: 'idle' as const,
        },
        newPollState: {
            status: 'idle' as const,
        },
        ...overrides
    };
}

export default getDefaultState;