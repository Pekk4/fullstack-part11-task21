import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import BlogForm from './BlogForm';

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('BlogForm component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('creates blog with entered values', async () => {
    render(<BlogForm />);

    const user = userEvent.setup();
    await user.click(screen.getByText('New blog'));

    await user.type(screen.getByPlaceholderText('Input title here'), 'Mergehelvetistä itään');
    await user.type(screen.getByPlaceholderText('Input author here'), 'M. Luukkainen');
    await user.type(screen.getByPlaceholderText('Input URL here'), 'https://example.com');

    await user.click(screen.getByText('Create'));

    expect(mockDispatch).toHaveBeenCalled();
  });
});
