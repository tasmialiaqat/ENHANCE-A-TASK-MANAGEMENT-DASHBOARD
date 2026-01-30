import { useEffect } from 'react';
import { useAppSelector } from './hooks';
import { useTaskActions, useUserActions } from './hooks';
import { useTaskContext } from './TaskContext';
import { TaskCard } from './TaskCard';
import { BulkActions } from './BulkActions';
import type { RootState, TaskStatus } from './types';
import styles from './styles.module.scss';

/**
 * Validates status transitions per Product Requirements
 * Allowed transitions:
 * - todo -> in_progress
 * - in_progress -> todo, done
 * - done -> in_progress
 */
function isValidStatusTransition(currentStatus: TaskStatus, newStatus: TaskStatus): boolean {
  if (currentStatus === newStatus) return true;

  const validTransitions: Record<TaskStatus, TaskStatus[]> = {
    todo: ['in_progress'],
    in_progress: ['todo', 'done'],
    done: ['in_progress'],
  };

  return validTransitions[currentStatus]?.includes(newStatus) || false;
}

export function TaskList() {
  const { tasks, loading, error, filter, selectedTaskIds } = useAppSelector((state: RootState) => state.tasks);
  const { users } = useAppSelector((state: RootState) => state.users);
  const { fetchTasks, deleteTask, updateTaskStatus, toggleTaskSelection } = useTaskActions();
  const { fetchUsers } = useUserActions();
  const { setEditingTaskId, setIsFormOpen } = useTaskContext();

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleEdit = (id: string) => {
    setEditingTaskId(id);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    // Validate status transition per Product Requirements
    if (!isValidStatusTransition(task.status, newStatus)) {
      alert(
        `Cannot move task from ${task.status.replace('_', ' ')} to ${newStatus.replace('_', ' ')}. ` +
        'Tasks must follow the workflow: Todo → In Progress → Done.'
      );
      return;
    }

    updateTaskStatus(id, newStatus);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter.status !== 'all' && task.status !== filter.status) {
      return false;
    }
    if (filter.searchQuery && !task.title.toLowerCase().includes(filter.searchQuery.toLowerCase())) {
      return false;
    }
    if (filter.assigneeId && task.assigneeId !== filter.assigneeId) {
      return false;
    }
    return true;
  });

  if (loading && tasks.length === 0) {
    return <div className={styles.loading}>Loading tasks...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.taskList} data-testid="task-list">
      <BulkActions />
      {filteredTasks.length === 0 ? (
        <div className={styles.emptyState}>
          No tasks found. Create your first task!
        </div>
      ) : (
        <div className={styles.taskGrid}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              isSelected={selectedTaskIds.includes(task.id)}
              onToggleSelection={toggleTaskSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
}
