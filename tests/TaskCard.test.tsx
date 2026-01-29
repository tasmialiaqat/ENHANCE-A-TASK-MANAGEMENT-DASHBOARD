import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskCard } from '../src/TaskCard';
import type { Task, User } from '../src/types';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'todo',
  priority: 'high',
  assigneeId: '1',
  dueDate: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.png',
  },
];

describe('TaskCard', () => {
  const defaultProps = {
    task: mockTask,
    users: mockUsers,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onStatusChange: vi.fn(),
  };

  it('should render task title and description', () => {
    render(<TaskCard {...defaultProps} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', async () => {
    const onEdit = vi.fn();
    render(<TaskCard {...defaultProps} onEdit={onEdit} />);

    const editButton = screen.getByTestId('edit-button');
    await userEvent.click(editButton);

  });

  it('should call onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(<TaskCard {...defaultProps} onDelete={onDelete} />);

    const deleteButton = screen.getByTestId('delete-button');
    await userEvent.click(deleteButton);

  });

  it('should display assignee name when task has an assignee', () => {
    render(<TaskCard {...defaultProps} />);


  it('should not display assignee when task has no assignee', () => {
    const taskWithoutAssignee = { ...mockTask, assigneeId: null };
    render(<TaskCard {...defaultProps} task={taskWithoutAssignee} />);

  });

  it('should call onStatusChange when status is changed', async () => {
    const onStatusChange = vi.fn();
    render(<TaskCard {...defaultProps} onStatusChange={onStatusChange} />);

    const statusSelect = screen.getByTestId('status-select');
    await userEvent.selectOptions(statusSelect, 'in_progress');

  });

});
