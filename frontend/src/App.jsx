import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogsList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Modal from './components/Modal';
import './index.css';
import { fetchBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/userReducer';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div>
      <Modal />
      {!user && <LoginForm />}
      {user && <BlogsList />}
      <br />
      {user && <BlogForm />}
    </div>
  );
};

export default App;
