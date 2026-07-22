import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

const blog = {
  title: 'Mergehelvetistä itään',
  author: 'M. Luukkainen',
  url: 'https://example.com',
  likes: 666,
  user: {
    username: 'Voldemort',
    name: 'T. Valedro',
  },
};

describe('BlogForm component', () => {
  test('calls callback function properly when creating blog', async () => {
    const mockHandler = vi.fn();

    render(<BlogForm createBlog={mockHandler} />);

    const title = screen.getByPlaceholderText('Input title here');
    const author = screen.getByPlaceholderText('Input author here');
    const url = screen.getByPlaceholderText('Input URL here');
    const submitButton = screen.getByText('Create');

    const user = userEvent.setup();

    await user.type(title, blog.title);
    await user.type(author, blog.author);
    await user.type(url, blog.url);
    await user.click(submitButton);

    const result = mockHandler.mock.calls[0][0];

    expect(result.title).toBe(blog.title);
    expect(result.author).toBe(blog.author);
    expect(result.url).toBe(blog.url);
  });
});
