import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { taskTriggerActions } from './taskActions';
import { taskActions } from './taskReducer';
import { userTriggerActions } from './userActions';
import type { Task, TaskFilter, TaskStatus } from './types';

export type { RootState };

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export function useAppSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector);
}

export function useTaskActions() {
  const dispatch = useAppDispatch();

  return {
    fetchTasks: () => dispatch(taskTriggerActions.fetchTasksTrigger()),
    createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) =>
      dispatch(taskTriggerActions.createTaskTrigger({ task })),
    updateTask: (id: string, updates: Partial<Task>) =>
      dispatch(taskTriggerActions.updateTaskTrigger({ id, updates })),
    deleteTask: (id: string) => dispatch(taskTriggerActions.deleteTaskTrigger({ id })),
    bulkDeleteTasks: (ids: string[]) => dispatch(taskTriggerActions.bulkDeleteTrigger({ ids })),
    setFilter: (filter: Partial<TaskFilter>) =>
      dispatch(taskActions.setFilter({ filter })),
    updateTaskStatus: (id: string, status: TaskStatus) =>
      dispatch(taskActions.updateTaskStatus({ id, status })),
    toggleTaskSelection: (id: string) => dispatch(taskActions.toggleTaskSelection({ id })),
    selectAllTasks: (ids: string[]) => dispatch(taskActions.selectAllTasks({ ids })),
    clearSelection: () => dispatch(taskActions.clearSelection()),
  };
}

export function useUserActions() {
  const dispatch = useAppDispatch();

  return {
    fetchUsers: () => dispatch(userTriggerActions.fetchUsersTrigger()),
  };
}
