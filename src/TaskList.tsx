import { useEffect } from 'react';
import { useAppSelector } from './hooks';
import { useTaskActions, useUserActions } from './hooks';
import { useTaskContext } from './TaskContext';
import { TaskCard } from './TaskCard';
import type { RootState, TaskStatus } from './types';
import styles from './styles.module.scss';

export function TaskList() {
  const { tasks, loading, error, filter } = useAppSelector((state: RootState) => state.tasks);
  const { users } = useAppSelector((state: RootState) => state.users);
  const { fetchTasks, deleteTask, updateTaskStatus } = useTaskActions();
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

  const handleStatusChange = (id: string, status: TaskStatus) => {
    updateTaskStatus(id, status);
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
