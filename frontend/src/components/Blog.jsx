import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const [detailedView, setDetailedView] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    margin: 5,
  };

  const toggleView = () => {
    setDetailedView(!detailedView);
  };

  const addLike = () => {
    const blogBody = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    dispatch(updateBlog(blogBody));
  };

  const deleteHandler = () => {
    dispatch(deleteBlog(blog));
  };

  if (!detailedView) {
    return (
      <div className="blog">
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author} <button onClick={toggleView}>View</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="blog">
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author} <button onClick={toggleView}>Hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            Likes {blog.likes} <button onClick={addLike}>Like</button>
          </div>
          <div>{blog.user.name}</div>
          {user && blog.user.username === user.username && (
            <button onClick={deleteHandler}>Remove</button>
          )}
        </div>
      </div>
    );
  }
};

export default Blog;
