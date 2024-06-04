import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import authedUserReducer from '../features/authedUser/authedUserSlice';
import questionsReducer from '../features/questions/questionsSlice';
import answerQuestionReducer from '../features/questions/answerQuestionSlice';
import newPollQuestionSlice from '../features/questions/newPollQuestionSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer, // todo: remove and associated files
    users: usersReducer,
    authedUser: authedUserReducer,
    questionsState: questionsReducer,
    answerState: answerQuestionReducer,
    newPollState: newPollQuestionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
