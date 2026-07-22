import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './reducers/modalReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});
