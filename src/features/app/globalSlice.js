import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    collapsed: false,
    modalShowing: '',
    modalLoading: '',
  },
  reducers: {
    collapseMenu: (state, action) => {
      state.collapsed = !state.collapsed;
    },
    showModal: (state, action) => {
      state.modalShowing = action.payload;
    },
    hideModal: (state, action) => {
      state.modalShowing = '';
      state.modalLoading = '';
    },
    addLoadingModal: (state, action) => {
      state.modalLoading = action.payload;
    },
    removeLoadingModal: (state, action) => {
      state.modalLoading = '';
    },
  },
});

export const {
  collapseMenu,
  showModal,
  hideModal,
  addLoadingModal,
  removeLoadingModal,
} = globalSlice.actions;

export default globalSlice.reducer;

export const selectCollapsed = (state) => state.global.collapsed;
export const selectModalShowing = (state) => state.global.modalShowing;
export const selectModalLoading = (state) => state.global.modalLoading;
