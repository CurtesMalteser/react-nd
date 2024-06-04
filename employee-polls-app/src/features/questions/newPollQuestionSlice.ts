import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { _saveQuestion } from "../../utils/_DATA";
import { RootState } from "../../app/store";

export interface QuestionsState {
    question: { optionOne: string, optionTwo: string, author: string };
    status: 'idle' | 'loading' | 'failed';
}

const initialState: QuestionsState = {
    question: { optionOne: '', optionTwo: '', author: '' },
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
    reducers: {
        updateOptionOne: (state, action: PayloadAction<string>) => {
            state.question.optionOne = action.payload;
        },
        updateOptionTwo: (state, action: PayloadAction<string>) => {
            state.question.optionTwo = action.payload;
        },
        updateAuthor: (state, action: PayloadAction<string>) => {
            state.question.author = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postNewPoll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postNewPoll.fulfilled, (state) => {
                state.status = 'idle';
                state.question = initialState.question;
            })
            .addCase(postNewPoll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { updateOptionOne, updateOptionTwo, updateAuthor } = newPollQuestionSlice.actions;

export const isValid = createSelector(
    (state: RootState) => state.newPollState.question,
    (question) => { return question.optionOne.length > 0 && question.optionTwo.length > 0 && question.author.length > 0 }
);

export const status = (state: RootState) => state.newPollState.status;

export default newPollQuestionSlice.reducer;