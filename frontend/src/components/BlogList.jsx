import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../reducers/userReducer';
import Blog from './Blog';

const BlogsList = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout(user.username));
  };

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.username} logged in <button onClick={logoutHandler}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;
