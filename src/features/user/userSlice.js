import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from '../../services/user';
import { selectToken } from '../auth/authSlice';
import { showMessage } from '../app/alertSlice';

export const fetchMe = createAsyncThunk('user/fetchMe', async (_, thunk) => {
  const token = selectToken(thunk.getState());
  console.log(token);
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
export const removeUser = createAsyncThunk('user/removeUser', async (_id, thunk) => {
  const token = selectToken(thunk.getState());
  try {
    const { rowsDeleted } = await userService.deleteUser(token, _id);
    if (rowsDeleted === 0) throw new Error("Lỗi khi xoá: tài khoản không tồn tại!");
    return {
      rowsDeleted,
      _id
    };
  } catch (error) {
    thunk.dispatch(showMessage({
      type: "error",
      message: error.message,
      duration: 3,
      key: "removeUser"
    }))
    throw error;
  }
})
export const updateUser = createAsyncThunk('user/updateUser', async (fields = {}, thunk) => {
  const token = selectToken(thunk.getState());
  try {
    const { _id, name, email, password, userName, permission } = fields;
    const result = await userService.updateUser(token, _id, {
      name, email, password, userName, permission
    })
    return result;
  } catch (error) {
    thunk.dispatch(showMessage({
      type: "error",
      message: error.message,
      duration: 3,
      key: "updateUser"
    }))
    throw error;
  }
})
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    fetchingUsers: false,
    me: {},
    fetchingMe: false,
    modalAddUserVisible: false,
    addingUser: false,
    addUserError: false
  },
  reducers: {
    showModal: (state, action) => {
      state.modalAddUserVisible = true
    },
    hideModal: (state, action) => {
      state.modalAddUserVisible = false
    }
  },
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
    },
    [addUser.fulfilled]: (state, action) => {
      state.addingUser = false;
      state.users.push(action.payload);
      state.modalAddUserVisible = false;
    },
    [addUser.rejected]: (state, action) => {
      state.addingUser = false;
      state.addUserError = action.error?.message;
    },
    [removeUser.fulfilled]: (state, action) => {
      state.users = state.users.filter(e => e && e._id !== action.payload._id);
    },
    [updateUser.fulfilled]: (state, action) => {
      const i = state.users.findIndex(e => e._id === action.payload._id);
      state.users[i] = action.payload;
    }
  }
})

export const selectMe = state => state.user.me;
export const selectFetchingMe = state => state.user.fetchingMe;
export const selectUsers = state => state.user.users;
export const selectFetchingUsers = state => state.user.fetchingUsers;
export const selectAddingUser = state => state.user.addingUser;
export const selectAddUserError = state => state.user.addUserError;
export const selectModalAddUserVisible = state => state.user.modalAddUserVisible;

export const { showModal, hideModal } = userSlice.actions;

export default userSlice.reducer;
