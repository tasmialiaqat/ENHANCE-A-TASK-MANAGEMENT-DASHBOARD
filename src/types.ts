import { RootState } from './store';

export type { RootState };

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: TaskFilter;
  selectedTaskIds: string[];
}

export interface TaskFilter {
  status: TaskStatus | 'all';
  searchQuery: string;
  assigneeId: string | null;
}

export interface UsersState {
  users: User[];
  loading: boolean;
}
