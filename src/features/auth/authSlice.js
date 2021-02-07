import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../services/user';
const session = JSON.parse(localStorage.getItem('session') || '{}');
export const login = createAsyncThunk('auth/login', async (_, thunk) => {
  const { userName, password } = _ || {};
  const result = await userService.login(userName, password);
  return result;
});
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: !!session.token,
    loggingIn: false,
    session,
  },
  reducers: {
    logout: (state, action) => {
      localStorage.clear();
      return {
        loggedIn: false,
        session: {},
      };
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      return {
        loggingIn: true,
        session: {},
      };
    },
    [login.fulfilled]: (state, action) => {
      const session = action.payload;
      localStorage.setItem('session', JSON.stringify(session));
      return {
        loggedIn: true,
        session: session,
      };
    },
    [login.rejected]: (state, action) => {
      return {
        error: action.error,
        session: {},
      };
    },
  },
});
export const selectLogged = (state) => state.auth.loggedIn;
export const selectLogging = (state) => state.auth.loggingIn;
export const selectError = (state) => state.auth.error;
export const selectSession = (state) => state.auth.session;
export const selectToken = (state) => state.auth.session?.token;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
