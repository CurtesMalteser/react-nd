import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import authedUserReducer from '../features/authedUser/authedUserSlice';
import questionsReducer from '../features/questions/questionsSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer, // todo: remove and associated files
    users: usersReducer,
    authedUser: authedUserReducer,
    questions: questionsReducer,
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
