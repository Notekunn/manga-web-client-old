import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from '../../services/user';
import { selectToken } from '../auth/authSlice';
export const fetchMe = createAsyncThunk('user/fetchMe', async (_, thunk) => {
    const state = thunk.getState();
    const token = selectToken(state);
    const result = await userService.getMe(token);
    return result;
})
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, thunk) => {
    const state = thunk.getState();
    const token = selectToken(state);
    const result = await userService.getAll(token);
    return result;
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        fetchingUsers: false,
        me: [],
        fetchingMe: false,
        // fetchingMeError: false
    },
    reducers: {

    },
    extraReducers: {
        [fetchMe.pending]: (state, action) => {
            state.me = [];
            state.fetchingMe = true;
        },
        [fetchMe.fulfilled]: (state, action) => {
            state.me = action.payload;
            state.fetchingMe = false;
        },
        [fetchMe.rejected]: (state, action) => {
            state.me = [];
            state.fetchingMe = false;
        },
        [fetchUsers.pending]: (state, action) => {
            state.users = [];
            state.fetchingUsers = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.fetchingUsers = false;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.users = [];
            state.fetchingUsers = false;
        },
    }
})

export const selectMe = state => state.user.me;
export const selectFetchingMe = state => state.user.fetchingMe;
export const selectUsers = state => state.user.users;
export const selectFetchingUsers = state => state.user.fetchingUsers;

export default userSlice.reducer;