import { memo } from 'react';
import type { Task, User, TaskStatus } from './types';
import { TaskDueDate } from './TaskDueDate';
import styles from './styles.module.scss';

interface TaskCardProps {
  task: Task;
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  isSelected?: boolean;
  onToggleSelection?: (id: string) => void;
}

function TaskCardComponent({ task, users, onEdit, onDelete, onStatusChange, isSelected, onToggleSelection }: TaskCardProps) {
  const assignee = users.find((u) => u.id === task.assigneeId);

  const statusOptions: TaskStatus[] = ['todo', 'in_progress', 'done'];

  // Fix: Use task.priority instead of task.status for card accent styling
  const getCardAccentClass = () => {
    switch (task.priority) {
      case 'high':
        return styles.priorityHigh;
      case 'medium':
        return styles.priorityMedium;
      case 'low':
        return styles.priorityLow;
      default:
        return '';
    }
  };
  
  return (
    <div className={`${styles.taskCard} ${getCardAccentClass()}`} data-testid="task-card">
      <div className={styles.taskHeader}>
        {onToggleSelection && (
          <input
            type="checkbox"
            checked={isSelected || false}
            onChange={() => onToggleSelection(task.id)}
            className={styles.taskCheckbox}
            data-testid="task-checkbox"
          />
        )}
        <h3 className={styles.taskTitle}>{task.title}</h3>
        <div className={styles.taskActions}>
          <button
            onClick={() => onEdit(task.id)}
            className={styles.editButton}
            data-testid="edit-button"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className={styles.deleteButton}
            data-testid="delete-button"
          >
            Delete
          </button>
        </div>
      </div>

      <p className={styles.taskDescription}>{task.description}</p>

      <div className={styles.taskMeta}>
        <div className={styles.statusSelector}>
          <label htmlFor={`status-${task.id}`}>Status:</label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
            className={styles.statusSelect}
            data-testid="status-select"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {assignee && (
          <div className={styles.assignee}>
            <img src={assignee.avatar} alt={assignee.name} className={styles.avatar} />
            <span>{assignee.name}</span>
          </div>
        )}

        <div className={styles.priority}>
          Priority: {task.priority || 'Unknown'}
        </div>

        <TaskDueDate dueDate={task.dueDate} status={task.status} />
      </div>
    </div>
  );
}

export const TaskCard = memo(TaskCardComponent);
