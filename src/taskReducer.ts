import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TasksState, Task, TaskFilter, TaskStatus } from './types';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filter: {
    status: 'all',
    searchQuery: '',
    assigneeId: null,
  },
  selectedTaskIds: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStarted(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action: PayloadAction<{ tasks: Task[] }>) {
      state.loading = false;
      state.tasks = action.payload.tasks;
    },
    fetchTasksFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    createTaskStarted(state) {
      state.loading = true;
    },
    createTaskSuccess(state, action: PayloadAction<{ task: Task }>) {
      state.loading = false;
      state.tasks.push(action.payload.task);
    },
    createTaskFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },
    updateTaskSuccess(state, action: PayloadAction<{ task: Task }>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.task.id);
      if (index !== -1) {
        state.tasks[index] = action.payload.task;
      }
    },
    updateTaskFailure(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error;
    },
    deleteTaskSuccess(state, action: PayloadAction<{ id: string }>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      state.selectedTaskIds = state.selectedTaskIds.filter((id) => id !== action.payload.id);
    },
    deleteTaskFailure(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error;
    },
    setFilter(state, action: PayloadAction<{ filter: Partial<TaskFilter> }>) {
      state.filter = { ...state.filter, ...action.payload.filter };
    },
    updateTaskStatus(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
      }
      state.tasks.sort((a, b) => {
        const statusOrder = { todo: 0, in_progress: 1, done: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
    },
    toggleTaskSelection(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const index = state.selectedTaskIds.indexOf(id);
      if (index === -1) {
        state.selectedTaskIds.push(id);
      } else {
        state.selectedTaskIds.splice(index, 1);
      }
    },
    selectAllTasks(state, action: PayloadAction<{ ids: string[] }>) {
      state.selectedTaskIds = action.payload.ids;
    },
    clearSelection(state) {
      state.selectedTaskIds = [];
    },
    bulkDeleteSuccess(state, action: PayloadAction<{ ids: string[] }>) {
      state.tasks = state.tasks.filter((task) => !action.payload.ids.includes(task.id));
      state.selectedTaskIds = [];
    },
  },
});

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
