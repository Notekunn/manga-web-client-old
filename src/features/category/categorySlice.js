import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import message from "antd/lib/message";
import { selectToken } from "../auth/authSlice";
import * as categoryService from "../../services/category";
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, thunk) => {
    const result = await categoryService.getAll();
    return result;
  }
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (params, thunk) => {
    const token = selectToken(thunk.getState());
    const result = await categoryService.createCategory(token, params);
    return result;
  }
);
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (fields, thunk) => {
    const token = selectToken(thunk.getState());
    const { _id, title, description } = fields;
    const result = await categoryService.updateCategory(token, _id, {
      title,
      description,
    });
    return result;
  }
);
export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  async (_id, thunk) => {
    const token = selectToken(thunk.getState());
    const { rowsDeleted } = await categoryService.deleteCategory(token, _id);
    if (rowsDeleted === 0) throw new Error("Tác giả không tồn tại!");
    return {
      rowsDeleted,
      _id,
    };
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState: {
    fetching: false,
    categories: [],
  },
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.fetching = true;
      state.categories = [];
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.fetching = false;
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.fetching = false;
      state.categories = [];
      message.error({
        content: "Lấy thể loại thất bại: " + action.error.message,
        key: "category/fetchCategories",
        duration: 3,
      });
    },
    [addCategory.pending]: (state, action) => {
      message.loading({
        content: "Đang thêm thể loại",
        key: "category/addCategory",
      });
    },
    [addCategory.fulfilled]: (state, action) => {
      state.categories.push(action.payload);
      message.success({
        content: "Thêm thể loại thành công",
        key: "category/addCategory",
        duration: 3,
      });
    },
    [addCategory.rejected]: (state, action) => {
      message.error({
        content: "Thêm thể loại thất bại: " + action.error.message,
        key: "category/addCategory",
        duration: 3,
      });
    },
    [updateCategory.pending]: (state, action) => {
      message.loading({
        content: "Đang sửa thể loại",
        key: "category/updateCategory",
      });
    },
    [updateCategory.fulfilled]: (state, action) => {
      const i = state.categories.findIndex((e) => e._id === action.payload._id);
      if (i >= 0) state.categories[i] = action.payload;
      message.success({
        content: "Sửa thể loại thành công",
        key: "category/updateCategory",
        duration: 3,
      });
    },
    [updateCategory.rejected]: (state, action) => {
      message.error({
        content: "Cập nhật thể loại thất bại: " + action.error.message,
        key: "category/updateCategory",
        duration: 3,
      });
    },
    [removeCategory.pending]: (state, action) => {
      message.loading({
        content: "Đang xoá thể loại",
        key: "category/removeCategory",
      });
    },
    [removeCategory.fulfilled]: (state, action) => {
      state.categories = state.categories.filter(
        (e) => e && e._id !== action.payload._id
      );
      message.success({
        content: "Xoá thể loại thành công",
        key: "category/removeCategory",
        duration: 3,
      });
    },
    [removeCategory.rejected]: (state, action) => {
      message.error({
        content: "Xoá thể loại thất bại: " + action.error.message,
        key: "category/removeCategory",
        duration: 3,
      });
    },
  },
});

export const selectFetchingCategories = (state) => state.category.fetching;
export const selectCategories = (state) => state.category.categories;

export default categorySlice.reducer;
