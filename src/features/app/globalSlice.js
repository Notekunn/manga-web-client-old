import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: "global",
  initialState: {
    collapsed: true
  },
  reducers: {
    collapseMenu: (state, action) => {
      state.collapsed = !state.collapsed;
    }
  }
})

export const { collapseMenu } = globalSlice.actions;

export default globalSlice.reducer;

export const selectCollapsed = state => state.global.collapsed;
