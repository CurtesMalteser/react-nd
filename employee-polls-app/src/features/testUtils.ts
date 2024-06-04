import { RootState } from "../app/store";

function getDefaultState(overrides: Partial<RootState> = {}): RootState {
    return {
      counter: {
          value: 0,
          status: 'idle' as const,
      },
      users: {
          users: {},
          status: 'idle' as const,
      },
      authedUser: {
          user: null,
          loggedIn: false,
          status: 'idle' as const,
      },
      questionsState: {
          questions: [],
          status: 'idle' as const,
      },
      answerState: {
          status: 'idle' as const,
      },
      newPollState: {
          question: { optionOne: '', optionTwo: '', author: '' },
          status: 'idle' as const,
      },
      ...overrides
    };
  }

  export default getDefaultState;