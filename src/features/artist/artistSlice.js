import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import message from 'antd/lib/message';
import { selectToken } from '../auth/authSlice';
import * as artistService from '../../services/artist';
export const fetchArtists = createAsyncThunk('artist/fetchArtists', async (_, thunk) => {
  const result = await artistService.getAll();
  return result;
});
export const addArtist = createAsyncThunk('artist/addArtist', async (params, thunk) => {
  const token = selectToken(thunk.getState());
  const result = await artistService.createArtist(token, params);
  return result;
});
export const updateArtist = createAsyncThunk('artist/updateArtist', async (fields, thunk) => {
  const token = selectToken(thunk.getState());
  const { _id, name, about, coverUrl } = fields;
  const result = await artistService.updateArtist(token, _id, { name, about, coverUrl });
  return result;
});
export const removeArtist = createAsyncThunk('artist/removeArtist', async (_id, thunk) => {
  const token = selectToken(thunk.getState());
  const { rowsDeleted } = await artistService.deleteArtist(token, _id);
  if (rowsDeleted === 0) throw new Error('Tác giả không tồn tại!');
  return {
    rowsDeleted,
    _id,
  };
});
const artistSlice = createSlice({
  name: 'artist',
  initialState: {
    fetchingArtists: false,
    artists: [],
  },
  reducers: {},
  extraReducers: {
    [fetchArtists.pending]: (state, action) => {
      state.fetchingArtists = true;
      state.artists = [];
    },
    [fetchArtists.fulfilled]: (state, action) => {
      state.fetchingArtists = false;
      state.artists = action.payload;
    },
    [fetchArtists.rejected]: (state, action) => {
      state.fetchingArtists = false;
      state.artists = [];
      message.error({
        content: 'Lấy tác giả thất bại',
        key: 'artist/fetchArtists',
        duration: 3,
      });
    },
    [addArtist.pending]: (state, action) => {
      message.loading({ content: 'Đang thêm tác giả', key: 'artist/addArtist' });
    },
    [addArtist.fulfilled]: (state, action) => {
      state.artists.push(action.payload);
      message.success({ content: 'Thêm tác giả thành công', key: 'artist/addArtist', duration: 3 });
    },
    [addArtist.rejected]: (state, action) => {
      message.error({
        content: 'Thêm tác giả thất bại: ' + action.error.message,
        key: 'artist/addArtist',
        duration: 3,
      });
    },
    [updateArtist.pending]: (state, action) => {
      message.loading({ content: 'Đang sửa tác giả', key: 'artist/updateArtist' });
    },
    [updateArtist.fulfilled]: (state, action) => {
      const i = state.artists.findIndex((e) => e._id === action.payload._id);
      if (i >= 0) state.artists[i] = action.payload;
      message.success({
        content: 'Sửa tác giả thành công',
        key: 'artist/updateArtist',
        duration: 3,
      });
    },
    [updateArtist.rejected]: (state, action) => {
      message.error({
        content: 'Cập nhật tác giả thất bại: ' + action.error.message,
        key: 'artist/updateArtist',
        duration: 3,
      });
    },
    [removeArtist.pending]: (state, action) => {
      message.loading({ content: 'Đang xoá tác giả', key: 'artist/removeArtist' });
    },
    [removeArtist.fulfilled]: (state, action) => {
      state.artists = state.artists.filter((e) => e && e._id !== action.payload._id);
      message.success({
        content: 'Xoá tác giả thành công',
        key: 'artist/removeArtist',
        duration: 3,
      });
    },
    [removeArtist.rejected]: (state, action) => {
      message.error({
        content: 'Xoá tác giả thất bại: ' + action.error.message,
        key: 'artist/removeArtist',
        duration: 3,
      });
    },
  },
});

export const selectFetchingArtists = (state) => state.artist.fetchingArtists;
export const selectArtists = (state) => state.artist.artists;

export default artistSlice.reducer;
