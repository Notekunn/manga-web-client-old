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
        content: 'Thêm tác giả thất bại: ' + action.error,
        key: 'artist/addArtist',
        duration: 3,
      });
    },
  },
});

export const selectFetchingArtists = (state) => state.artist.fetchingArtists;
export const selectArtists = (state) => state.artist.artists;

export default artistSlice.reducer;
