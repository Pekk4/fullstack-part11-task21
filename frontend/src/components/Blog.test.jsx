import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

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
const appUser = { ...blog.user };

describe('Blog component', () => {
  test('renders content', () => {
    render(<Blog blog={blog} />);

    const element = screen.getByText(`${blog.title} ${blog.author}`);
    expect(element).toBeDefined();
  });

  test('renders extended content after clicking the button', async () => {
    render(<Blog blog={blog} user={appUser} />);

    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined();
    expect(screen.getByText(`Likes ${blog.likes}`)).toBeDefined();
    expect(screen.getByText(blog.url)).toBeDefined();
    expect(screen.getByText(appUser.name)).toBeDefined();
  });

  test("'s like button calls handler-function properly", async () => {
    const mockHandler = vi.fn();

    render(<Blog blog={blog} likeHandler={mockHandler} user={appUser} />);

    const user = userEvent.setup();
    const expandButton = screen.getByText('View');
    await user.click(expandButton);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
