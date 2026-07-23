import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Blog from './Blog';

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => ({ username: 'Voldemort', name: 'T. Valedro' }),
}));

vi.mock('../reducers/blogReducer', () => ({
  updateBlog: (blog) => ({ type: 'UPDATE_BLOG', payload: blog }),
  deleteBlog: (blog) => ({ type: 'DELETE_BLOG', payload: blog }),
}));

const blog = {
  id: '1',
  title: 'Mergehelvetistä itään',
  author: 'M. Luukkainen',
  url: 'https://example.com',
  likes: 666,
  user: {
    username: 'Voldemort',
    name: 'T. Valedro',
  },
};

describe('Blog component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('renders content', () => {
    render(<Blog blog={blog} />);

    expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined();
  });

  test('renders extended content after clicking the button', async () => {
    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    await user.click(screen.getByText('View'));

    expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined();
    expect(screen.getByText(`Likes ${blog.likes}`)).toBeDefined();
    expect(screen.getByText(blog.url)).toBeDefined();
    expect(screen.getByText(blog.user.name)).toBeDefined();
  });

  test('clicking like dispatches update action', async () => {
    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    await user.click(screen.getByText('View'));
    await user.click(screen.getByText('Like'));
    await user.click(screen.getByText('Like'));

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
