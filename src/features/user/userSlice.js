import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from '../../services/user';
import { selectToken } from '../auth/authSlice';
import message from 'antd/lib/message';

export const fetchMe = createAsyncThunk('user/fetchMe', async (_, thunk) => {
  const token = selectToken(thunk.getState());
  const result = await userService.getMe(token);
  return result;
});
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, thunk) => {
  const token = selectToken(thunk.getState());
  const result = await userService.getAll(token);
  return result;
});
export const addUser = createAsyncThunk('user/addUser', async (account, thunk) => {
  const { email, password, userName, name } = account;
  if (!email || !password || !userName || !name) throw new Error('Vui lòng nhập đủ thông tin');
  const result = await userService.register(account);
  return result;
});
export const removeUser = createAsyncThunk('user/removeUser', async (_id, thunk) => {
  const token = selectToken(thunk.getState());
  const { rowsDeleted } = await userService.deleteUser(token, _id);
  if (rowsDeleted === 0) throw new Error('Tài khoản không tồn tại!');
  return {
    rowsDeleted,
    _id,
  };
});
export const updateUser = createAsyncThunk('user/updateUser', async (fields = {}, thunk) => {
  const token = selectToken(thunk.getState());
  const { _id, name, email, password, userName, permission } = fields;
  const result = await userService.updateUser(token, _id, {
    name,
    email,
    password,
    userName,
    permission,
  });
  return result;
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    fetchingUsers: false,
    users: [],
    fetchingMe: false,
    me: {},
    addingUser: false,
    addUserError: false,
  },
  reducers: {},
  extraReducers: {
    [fetchMe.pending]: (state, action) => {
      state.me = {};
      state.fetchingMe = true;
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.me = action.payload;
      state.fetchingMe = false;
    },
    [fetchMe.rejected]: (state, action) => {
      state.me = {};
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
      message.loading({ content: 'Đang thêm người dùng!', key: 'user/addUser' });
    },
    [addUser.fulfilled]: (state, action) => {
      state.addingUser = false;
      state.users.push(action.payload);
      state.modalAddUserVisible = false;
      message.success({ content: 'Thêm người dùng thành công!', key: 'user/removeUser' });
    },
    [addUser.rejected]: (state, action) => {
      state.addingUser = false;
      state.addUserError = action.error?.message;
      message.error({
        content: 'Thêm người dùng thất bại: ' + action.error?.message,
        key: 'user/updateUser',
      });
    },
    [removeUser.pending]: (state, action) => {
      message.loading({ content: 'Đang xoá người dùng!', key: 'user/removeUser' });
    },
    [removeUser.fulfilled]: (state, action) => {
      state.users = state.users.filter((e) => e && e._id !== action.payload._id);
      message.success({ content: 'Xoá người dùng thành công!', key: 'user/removeUser' });
    },
    [removeUser.rejected]: (state, action) => {
      message.error({
        content: 'Xoá người dùng thất bại: ' + action.error.message,
        key: 'user/removeUser',
      });
    },
    [updateUser.pending]: (state, action) => {
      message.loading({ content: 'Đang cập nhật người dùng!', key: 'user/updateUser' });
    },
    [updateUser.fulfilled]: (state, action) => {
      const i = state.users.findIndex((e) => e._id === action.payload._id);
      state.users[i] = action.payload;
      message.success({ content: 'Cập nhật người dùng thành công!', key: 'user/updateUser' });
    },
    [updateUser.rejected]: (state, action) => {
      message.error({ content: 'Cập nhật người dùng thất bại!', key: 'user/updateUser' });
    },
  },
});

export const selectMe = (state) => state.user.me;
export const selectFetchingMe = (state) => state.user.fetchingMe;
export const selectUsers = (state) => state.user.users;
export const selectFetchingUsers = (state) => state.user.fetchingUsers;
export const selectAddingUser = (state) => state.user.addingUser;
export const selectAddUserError = (state) => state.user.addUserError;

export default userSlice.reducer;
