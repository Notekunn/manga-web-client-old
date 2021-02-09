import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import message from 'antd/lib/message';
import * as artistService from '../../services/artist';
export const fetchArtists = createAsyncThunk('artist/fetchArtists', async (_, thunk) => {
  const result = await artistService.getAll();
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
  },
});

export const selectFetchingArtists = (state) => state.artist.fetchingArtists;
export const selectArtists = (state) => state.artist.artists;

export default artistSlice.reducer;
