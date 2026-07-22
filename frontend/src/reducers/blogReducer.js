import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';
import { showModal } from './modalReducer';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    sortBlogs(state) {
      return state.sort((a, b) => (b.likes > a.likes ? 1 : -1));
    },
  },
});

export const { setBlogs, addBlog, sortBlogs } = blogsSlice.actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch(setBlogs(blogs));
    dispatch(sortBlogs());
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const created = await blogService.create(newBlog);

    dispatch(addBlog(created));
    dispatch(showModal(`A new blog '${created.title}' by '${created.author}' added!`));
  };
};

export const updateBlog = (blogBody) => {
  return async (dispatch) => {
    await blogService.update(blogBody);

    dispatch(fetchBlogs());
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const confirm = `Remove blog '${blog.title}' by '${blog.author}'?`;

    if (window.confirm(confirm)) {
      const response = await blogService.deleteBlog(blog.id);

      if (response.status === 204) {
        dispatch(fetchBlogs());
        dispatch(showModal(`'${blog.title}' removed succesfully!`));
      }
    }
  };
};

export default blogsSlice.reducer;
