import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { _saveQuestionAnswer } from '../../utils/_DATA';
import Answer from '../../utils/answer';

export interface AnswerQuestionState {
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AnswerQuestionState = {
    status: 'idle',
};

export const postAnswer = createAsyncThunk(
    'answer/post',
    async ({ userID, answer: answerObj }: { userID: string, answer: Answer }) => {
        const [qid, answer] = Object.entries(answerObj)[0];
        const response = await _saveQuestionAnswer({ authedUser: userID, qid, answer });
        return response;
    }
);

export const answerQuestionSlice = createSlice({
    name: 'answer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postAnswer.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postAnswer.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(postAnswer.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const status = (state: RootState) => state.answerState.status;

export default answerQuestionSlice.reducer;