import { useAppSelector } from './hooks';
import type { RootState, TaskStatus } from './types';
import styles from './styles.module.scss';

export function BulkActions() {
  const selectedTaskIds = useAppSelector((state: RootState) => state.tasks.selectedTaskIds);

  const handleSelectAll = () => {
  };

  const handleClearSelection = () => {
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedTaskIds.length} tasks?`)) {
    }
  };

  const handleBulkStatusChange = (status: TaskStatus) => {
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
