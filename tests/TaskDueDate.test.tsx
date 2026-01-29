import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskDueDate } from '../src/TaskDueDate';

describe('TaskDueDate', () => {
  it.todo('should display formatted date when dueDate is provided');

  it.todo('should show "No due date" when dueDate is null');

  it.todo('should apply overdue styling for past due dates');

  it.todo('should not show overdue styling for completed tasks');

  it('should render without crashing', () => {
    render(<TaskDueDate dueDate={null} status="todo" />);
    expect(screen.getByText(/no due date/i)).toBeInTheDocument();
  });
});
