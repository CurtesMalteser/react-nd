import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { _getUsers } from '../../utils/_DATA';
import User from '../../utils/user';

const AUTHED_USER = 'user'

export interface AuthedUserState {
    user: User | null;
    loggedIn: boolean;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthedUserState = {
    user: null,
    loggedIn: false,
    status: 'idle',
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
    async (id: string) => {
        const response = await _getUsers();
        localStorage.setItem(AUTHED_USER, response.users[id].id);
        return response.users[id];
    }
);

export const logOut = createAsyncThunk(
    'authedUser/logOut',
    async () => {
        localStorage.removeItem(AUTHED_USER);
        return null;
    }
);

// Reducers
export const authedUserSlice = createSlice({
    name: 'authedUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | null>) => {
                if (action.payload !== null) {
                    const userAction = action as PayloadAction<User>;
                    onLoggedIn(state, userAction);
                } else { 
                    onLoggedOut(state);
                }
                state.status = 'idle';
            })
            .addCase(fetchUser.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(logIn.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logIn.fulfilled, (state, action: PayloadAction<User>) => {
                localStorage.setItem(AUTHED_USER, action.payload.id);
                onLoggedIn(state, action);
            }).addCase(logIn.rejected, (state) => {
                state.status = 'failed';
            }).addCase(logOut.pending, (state) => {
                state.status = 'loading';
            }).addCase(logOut.fulfilled, (state) => {
                onLoggedOut(state);
            }).addCase(logOut.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

// Utils
function onLoggedIn(state: AuthedUserState, action: PayloadAction<User>) {
    state.loggedIn = true;
    state.user = action.payload;
    state.status = 'idle';
}

function onLoggedOut(state: AuthedUserState) {
    state.loggedIn = false;
    state.user = null;
    state.status = 'idle';
}

export const authedUser = (state: RootState) => state.authedUser.user;

export default authedUserSlice.reducer;