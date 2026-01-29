import { useAppSelector } from './hooks';
import { useTaskActions } from './hooks';
import type { RootState, TaskStatus } from './types';
import styles from './styles.module.scss';

export function TaskFilter() {
  const { filter } = useAppSelector((state: RootState) => state.tasks);
  const { users } = useAppSelector((state: RootState) => state.users);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const { setFilter } = useTaskActions();
  
  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status !== 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  const handleStatusChange = (status: TaskStatus | 'all') => {
    setFilter({ status });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ searchQuery: e.target.value });
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ assigneeId: e.target.value || null });
  };

  return (
    <div className={styles.filterContainer} data-testid="task-filter">
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filter.searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
          data-testid="search-input"
        />
      </div>

      <div className={styles.filterTabs}>
        {(['all', 'todo', 'in_progress', 'done'] as const).map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`${styles.filterTab} ${filter.status === status ? styles.active : ''}`}
            data-testid={`filter-${status}`}
          >
            {status === 'all' ? 'All' : status.replace('_', ' ')}
            <span className={styles.count}>({taskCounts[status]})</span>
          </button>
        ))}
      </div>

      <div className={styles.assigneeFilter}>
        <select
          value={filter.assigneeId || ''}
          onChange={handleAssigneeChange}
          className={styles.assigneeSelect}
          data-testid="assignee-filter"
        >
          <option value="">All Assignees</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
