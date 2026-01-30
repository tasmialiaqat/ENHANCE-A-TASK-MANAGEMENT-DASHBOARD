import styles from './styles.module.scss';
import type { TaskStatus } from './types';

interface TaskDueDateProps {
  dueDate: string | null;
  status: TaskStatus;
}

/**
 * TaskDueDate Component
 * Displays due dates with proper styling based on the Product Requirements:
 * - No due date: Gray text
 * - Future (>1 day): Normal text with formatted date
 * - Due tomorrow: Blue/info style
 * - Due today: Yellow/warning style
 * - Overdue: Red/error style (only for incomplete tasks)
 * - Completed tasks: Never show as overdue
 */
export function TaskDueDate({ dueDate, status }: TaskDueDateProps) {
  if (!dueDate) {
    return <span className={styles.noDueDate}>No due date</span>;
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Start of today
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0); // Start of due date
  
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Completed tasks are never "overdue" per Product Requirements
  const isCompleted = status === 'done';
  const isOverdue = diffDays < 0 && !isCompleted;
  const isDueToday = diffDays === 0 && !isCompleted;
  const isDueTomorrow = diffDays === 1;

  // Format the date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Determine the display text and styling
  let displayText: string;
  let className: string = styles.dueDate;

  if (isOverdue) {
    const daysOverdue = Math.abs(diffDays);
    displayText = `${daysOverdue} day${daysOverdue === 1 ? '' : 's'} overdue`;
    className = `${styles.dueDate} ${styles.overdue}`;
  } else if (isDueToday) {
    displayText = 'Due today';
    className = `${styles.dueDate} ${styles.dueToday}`;
  } else if (isDueTomorrow) {
    displayText = 'Due tomorrow';
    className = `${styles.dueDate} ${styles.dueTomorrow}`;
  } else if (diffDays > 0 && diffDays <= 7) {
    displayText = `Due in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
  } else {
    displayText = `Due ${formatDate(due)}`;
  }

  return <span className={className}>{displayText}</span>;
}
