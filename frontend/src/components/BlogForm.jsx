import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog, fetchBlogs } from '../reducers/blogReducer';
import { showModal } from '../reducers/modalReducer';
import Togglable from './Togglable';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url: blogUrl,
    };

    dispatch(createBlog(blogObject));
    blogFormRef.current.toggleVisibility();
    dispatch(fetchBlogs());
    dispatch(showModal(`A new blog '${blogObject.title}' by '${blogObject.author}' added!`));

    setTitle('');
    setAuthor('');
    setBlogUrl('');
  };

  return (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <div>
        <h2>Create a new blog entry</h2>
        <form onSubmit={addBlog}>
          <div>
            Title:
            <input
              data-testid="blog-title"
              type="text"
              value={title}
              name="Title"
              placeholder="Input title here"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            Author:
            <input
              data-testid="blog-author"
              type="text"
              value={author}
              name="Author"
              placeholder="Input author here"
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div>
            URL:
            <input
              data-testid="blog-url"
              type="text"
              value={blogUrl}
              name="Url"
              placeholder="Input URL here"
              onChange={(event) => setBlogUrl(event.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
