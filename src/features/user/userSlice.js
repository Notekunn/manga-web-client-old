import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from '../../services/user';
import { selectToken } from '../auth/authSlice';
export const fetchMe = createAsyncThunk('user/fetchMe', async (_, thunk) => {
    const token = selectToken(thunk.getState());
    const result = await userService.getMe(token);
    return result;
})
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, thunk) => {
    const token = selectToken(thunk.getState());
    const result = await userService.getAll(token);
    return result;
})
export const addUser = createAsyncThunk('user/addUser', async (account, thunk) => {
    const { email, password, userName, name } = account;
    if (!email || !password || !userName || !name) throw new Error("Vui lòng nhập đủ thông tin");
    const result = await userService.register(account);
    return result;
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        fetchingUsers: false,
        me: [],
        fetchingMe: false,
        addingUser: false,
        addUserError: false
    },
    reducers: {},
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
        [addUser.pending]: (state, action) => {
            state.addingUser = true;
            state.addUserError = false;
        },
        [addUser.fulfilled]: (state, action) => {
            state.addingUser = false;
            state.users.push(action.payload);
            state.addUserError = false;
        },
        [addUser.rejected]: (state, action) => {
            state.addingUser = false;
            state.addUserError = action.error?.message;
        }
    }
})

export const selectMe = state => state.user.me;
export const selectFetchingMe = state => state.user.fetchingMe;
export const selectUsers = state => state.user.users;
export const selectFetchingUsers = state => state.user.fetchingUsers;
export const selectAddingUser = state => state.user.addingUser;
export const selectAddUserError = state => state.user.addUserError;

export default userSlice.reducer;