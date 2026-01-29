import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskComments } from '../src/TaskComments';
import type { User } from '../src/types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.png',
  },
];

describe('TaskComments', () => {
  it.todo('should fetch comments when component mounts');

  it.todo('should display loading state while fetching');

  it.todo('should show empty state when no comments');

  it.todo('should add a new comment');

  it.todo('should display user names for comments');

  it('should render the comments section', () => {
    render(<TaskComments taskId="1" users={mockUsers} />);
    expect(screen.getByTestId('task-comments')).toBeInTheDocument();
  });

  it('should have a comment input field', () => {
    render(<TaskComments taskId="1" users={mockUsers} />);
    expect(screen.getByTestId('comment-input')).toBeInTheDocument();
  });

  it('should have an add comment button', () => {
    render(<TaskComments taskId="1" users={mockUsers} />);
    expect(screen.getByTestId('add-comment-button')).toBeInTheDocument();
  });
});
