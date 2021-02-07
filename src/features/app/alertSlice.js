import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    notices: [{
      type: "info",
      message: "Chào mừng bạn đến với Manga App",
      duration: 5,
      key: "introduction"
    }]
  },
  reducers: {
    showMessage: (state, action) => {
      const { type = "info", message, duration, key = "introduction" } = action.payload;
      const notices = state.notices
        .filter(e => e && e.key !== key)
        .concat({ key, message, duration, type });
      return {
        notices
      };
    },
    clearMessage: (state, action) => {
      const notices = state.notices
        .filter(e => e && e.key !== action.payload);
      return {
        notices
      };
    }
  }
});
export const selectNotices = state => state.alert.notices;

export const { showMessage, clearMessage } = alertSlice.actions;

export default alertSlice.reducer;
