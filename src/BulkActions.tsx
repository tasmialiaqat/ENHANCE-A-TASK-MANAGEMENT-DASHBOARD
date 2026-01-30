import { useAppSelector } from './hooks';
import { useTaskActions } from './hooks';
import type { RootState, TaskStatus } from './types';
import styles from './styles.module.scss';

/**
 * BulkActions Component
 * Provides bulk operations for selected tasks with Product Requirements validation:
 * - High priority tasks cannot be bulk deleted
 * - Status changes must respect transition rules
 * - Shows confirmation dialogs with clear messaging
 * - Displays count of selected tasks
 */
export function BulkActions() {
  const selectedTaskIds = useAppSelector((state: RootState) => state.tasks.selectedTaskIds);
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const { bulkDeleteTasks, updateTaskStatus, clearSelection } = useTaskActions();

  const selectedTasks = tasks.filter((task) => selectedTaskIds.includes(task.id));

  const handleClearSelection = () => {
    clearSelection();
  };

  const handleBulkDelete = () => {
    // Per Product Requirements: High priority tasks cannot be bulk deleted
    const highPriorityTasks = selectedTasks.filter((task) => task.priority === 'high');
    const deletableTasks = selectedTasks.filter((task) => task.priority !== 'high');

    if (deletableTasks.length === 0) {
      alert('Cannot delete selected tasks. All selected tasks are high priority, which cannot be bulk deleted.');
      return;
    }

    let confirmMessage = `Delete ${deletableTasks.length} task(s)?`;
    if (highPriorityTasks.length > 0) {
      confirmMessage += `\n\n${highPriorityTasks.length} high-priority task(s) will be skipped. High priority tasks cannot be bulk deleted.`;
    }

    if (window.confirm(confirmMessage)) {
      const idsToDelete = deletableTasks.map((task) => task.id);
      bulkDeleteTasks(idsToDelete);

      if (highPriorityTasks.length > 0) {
        setTimeout(() => {
          alert(`${highPriorityTasks.length} high-priority task(s) were skipped. High priority tasks cannot be bulk deleted.`);
        }, 100);
      }
    }
  };

  const isValidTransition = (currentStatus: TaskStatus, newStatus: TaskStatus): boolean => {
    // Per Product Requirements: Status Transition Rules
    // todo -> in_progress
    // in_progress -> todo, done
    // done -> in_progress
    if (currentStatus === newStatus) return true;

    const validTransitions: Record<TaskStatus, TaskStatus[]> = {
      todo: ['in_progress'],
      in_progress: ['todo', 'done'],
      done: ['in_progress'],
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  };

  const handleBulkStatusChange = (newStatus: TaskStatus) => {
    if (!newStatus) return;

    const validTasks: typeof selectedTasks = [];
    const invalidTasks: typeof selectedTasks = [];

    selectedTasks.forEach((task) => {
      if (isValidTransition(task.status, newStatus)) {
        validTasks.push(task);
      } else {
        invalidTasks.push(task);
      }
    });

    if (validTasks.length === 0) {
      alert(`Cannot move any selected tasks to ${newStatus.replace('_', ' ')}. All transitions are invalid according to workflow rules.`);
      return;
    }

    // Apply the status change to valid tasks
    validTasks.forEach((task) => {
      updateTaskStatus(task.id, newStatus);
    });

    // Show summary message
    let message = `${validTasks.length} task(s) moved to ${newStatus.replace('_', ' ')}.`;
    if (invalidTasks.length > 0) {
      message += `\n${invalidTasks.length} task(s) could not be moved to ${newStatus.replace('_', ' ')} due to workflow restrictions.`;
    }

    setTimeout(() => {
      alert(message);
      clearSelection();
    }, 100);
  };

  if (selectedTaskIds.length === 0) {
    return null;
  }

  return (
    <div className={styles.bulkActions} data-testid="bulk-actions">
      <span className={styles.selectedCount}>
        {selectedTaskIds.length} task(s) selected
      </span>

      <div className={styles.bulkActionButtons}>
        <button onClick={handleClearSelection} data-testid="clear-selection">
          Clear Selection
        </button>

        <select
          onChange={(e) => handleBulkStatusChange(e.target.value as TaskStatus)}
          defaultValue=""
          data-testid="bulk-status-change"
        >
          <option value="" disabled>
            Change Status...
          </option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={handleBulkDelete}
          className={styles.deleteButton}
          data-testid="bulk-delete"
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
}
