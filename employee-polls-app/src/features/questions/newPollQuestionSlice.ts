import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _saveQuestion } from "../../utils/_DATA";
import { RootState } from "../../app/store";

export interface QuestionsState {
    status: 'idle' | 'loading' | 'failed';
}

const initialState: QuestionsState = {
    status: 'idle',
};

export const postNewPoll = createAsyncThunk(
    'poll/add',
    async ({ optionOne, optionTwo, author }: { optionOne: string, optionTwo: string, author: string }) => {
        const response = await _saveQuestion({ optionOne, optionTwo, author });
        return response;
    }
);

export const newPollQuestionSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postNewPoll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postNewPoll.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(postNewPoll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const status = (state: RootState) => state.newPollState.status;

export default newPollQuestionSlice.reducer;