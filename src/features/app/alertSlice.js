import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const addNotification = createAsyncThunk('alert/create', async (noti, thunk) => {
    await sleep(noti?.duration || 5);
    return noti;
})
const alertSlice = createSlice({
    name: "alert",
    initialState: {
        notices: [{
            type: "info",
            message: "Chào mừng bạn đến với Manga App",
            duration: 15,
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
    },
    extraReducers: {
        [addNotification.pending]: (state, action) => {
            const { type = "info", message, duration, key = "introduction" } = action?.meta?.arg || {};
            const removeOldNotices = state.notices
                .filter(e => e && e.key !== key);
            removeOldNotices.push({ type, message, duration, key });
            return {
                notices: removeOldNotices
            }
        },
        [addNotification.fulfilled]: (state, action) => {
            const { key = "introduction" } = action?.meta?.arg || {};
            return {
                notices: state.notices.filter(e => e && e.key !== "introduction" && e.key !== key)
            }
        }
    },
});
export const selectNotices = state => state.alert.notices;

export const { showMessage, clearMessage } = alertSlice.actions;
export default alertSlice.reducer;
