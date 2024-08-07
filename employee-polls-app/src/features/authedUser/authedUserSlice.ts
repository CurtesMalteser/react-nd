import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { _getUsers, _performLogin } from '../../utils/_DATA';
import User from '../../utils/user';
import Answer from '../../utils/answer';

const AUTHED_USER = 'user'

export interface AuthedUserState {
    user: User | null;
    loggedIn: boolean;
    status: 'idle' | 'loading' | 'failed';
    loginError: boolean;
}

const initialState: AuthedUserState = {
    user: null,
    loggedIn: false,
    status: 'idle',
    loginError: false,
};

// Thunks
export const fetchUser = createAsyncThunk(
    'authedUser/fetchUser',
    async () => {
        const userId = localStorage.getItem(AUTHED_USER);
        if (userId) {
            const response = await _getUsers();
            return response.users[userId];
        }
        return null;
    }
);

export const logIn = createAsyncThunk(
    'authedUser/logIn',
    async ({ username: id, password }: { username: string, password: string }) => {
        const response = await _performLogin(id, password);
        localStorage.setItem(AUTHED_USER, response.id);
        return response;
    }
);

export const logOut = createAsyncThunk(
    'authedUser/logOut',
    async () => {
        localStorage.removeItem(AUTHED_USER);
        return null;
    }
);

// #region Reducers
export const authedUserSlice = createSlice({
    name: 'authedUser',
    initialState,
    reducers: {
        clearLoginError: (state) => {
            state.loginError = false;
            state.status = 'idle';
        },
        updateUserAnswer: (state, action: PayloadAction<Answer>) => {
            if (state.user !== null) {
                state.user.answers = { ...state.user.answers, ...action.payload };
            }
        },
    },
    extraReducers: (builder) => {
        fetchUserCase(builder);
        logInCase(builder);
        logOutCase(builder);
    }
});

export const authedUser = (state: RootState) => state.authedUser.user;
export const userID = (state: RootState) => state.authedUser.user?.id;
export const userName = (state: RootState) => state.authedUser.user?.name;
export const userAvatarURL = (state: RootState) => state.authedUser.user?.avatarURL;
export const isAuthed = (state: RootState) => state.authedUser.loggedIn;
export const status = (state: RootState) => state.authedUser.status;
export const loginError = (state: RootState) => state.authedUser.loginError;
export const clearLoginError = authedUserSlice.actions.clearLoginError;
export const updateUserAnswer = authedUserSlice.actions.updateUserAnswer;
export const answer = (state: RootState, answerID: string) => {
    const answer = state.authedUser.user?.answers[answerID];
    return answer === 'optionOne' || answer === 'optionTwo' ? answer : undefined;
}

export default authedUserSlice.reducer;
// #endregion Reducers

// #region Cases
function onLoggedIn(state: AuthedUserState, action: PayloadAction<User>) {
    state.loggedIn = true;
    state.user = action.payload;
    state.status = 'idle';
    state.loginError = false;
}

function onLoggedOut(state: AuthedUserState) {
    state.loggedIn = false;
    state.user = null;
    state.status = 'idle';
}

function fetchUserCase(builder: ActionReducerMapBuilder<AuthedUserState>) {
    builder.addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
    }).addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        if (action.payload !== null) {
            const userAction = action as PayloadAction<User>;
            onLoggedIn(state, userAction);
        } else {
            onLoggedOut(state);
        }
        state.status = 'idle';
    }).addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
    });
}

function logInCase(builder: ActionReducerMapBuilder<AuthedUserState>) {
    builder.addCase(logIn.pending, (state) => {
        state.status = 'loading';
    }).addCase(logIn.fulfilled, (state, action: PayloadAction<User>) => {
        localStorage.setItem(AUTHED_USER, action.payload.id);
        onLoggedIn(state, action);
    }).addCase(logIn.rejected, (state) => {
        state.status = 'failed';
        state.loginError = true;
    })
}

function logOutCase(builder: ActionReducerMapBuilder<AuthedUserState>) {
    builder.addCase(logOut.pending, (state) => {
        state.status = 'loading';
    }).addCase(logOut.fulfilled, (state) => {
        onLoggedOut(state);
    }).addCase(logOut.rejected, (state) => {
        state.status = 'failed';
    });
}
// #endregion Cases