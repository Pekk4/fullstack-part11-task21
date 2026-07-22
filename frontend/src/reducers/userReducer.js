import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';
import blogService from '../services/blogs';
import { showModal } from './modalReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);

      if (user) {
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
      }

      dispatch(setUser(user));
      dispatch(showModal(`Logged in as '${user.username}'`));
    } catch (error) {
      dispatch(showModal('Wrong username or password!', true));
    }
  };
};

export const logout = (username) => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');

    dispatch(clearUser());
    dispatch(showModal(`Logged out '${username}'! Goodbye!`));
  };
};

export const initUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export default userSlice.reducer;
