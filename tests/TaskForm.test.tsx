import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { TaskForm } from '../src/TaskForm';
import { TaskProvider } from '../src/TaskContext';
import { taskReducer, taskActions } from '../src/taskReducer';
import { userReducer } from '../src/userReducer';
import { taskSagas } from '../src/taskSaga';
import { userSagas } from '../src/userSaga';
import type { Task, User } from '../src/types';
import * as TaskContextModule from '../src/TaskContext';

const mockTask: Task = {
  id: '1',
  title: 'Original Title',
  description: 'Original Description',
  status: 'todo',
  priority: 'high',
  assigneeId: '1',
  dueDate: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.png',
  },
];

function createTestStore(initialTasks: Task[] = [], initialUsers: User[] = []) {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      tasks: taskReducer,
      users: userReducer,
    },
    preloadedState: {
      tasks: {
        tasks: initialTasks,
        loading: false,
        error: null,
        filter: { status: 'all' as const, searchQuery: '', assigneeId: null },
        selectedTaskIds: [],
      },
      users: {
        users: initialUsers,
        loading: false,
      },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });

  function* rootSaga() {
    yield all([taskSagas(), userSagas()]);
  }
  sagaMiddleware.run(rootSaga);

  return store;
}

describe('TaskForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render nothing when form is closed', () => {
    const store = createTestStore([mockTask], mockUsers);
    render(
      <Provider store={store}>
        <TaskProvider>
          <TaskForm />
        </TaskProvider>
      </Provider>
    );

    expect(screen.queryByTestId('task-form-modal')).not.toBeInTheDocument();
  });
  
  it('should update form when task data changes in Redux', async () => {
    const store = createTestStore([mockTask], mockUsers);

    const { rerender } = render(
      <Provider store={store}>
        <TaskProvider>
          <TaskFormWithContext editingTaskId="1" />
        </TaskProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('title-input')).toHaveValue('Original Title');
    });

    store.dispatch(
      taskActions.updateTaskSuccess({
        task: {
          ...mockTask,
          title: 'Updated Title',
          description: 'Updated Description',
        },
      })
    );

    rerender(
      <Provider store={store}>
        <TaskProvider>
          <TaskFormWithContext editingTaskId="1" />
        </TaskProvider>
      </Provider>
    );

    await waitFor(() => {
      const titleInput = screen.getByTestId('title-input');
      expect(titleInput).toHaveValue('Updated Title');
    });
  });
});

function TaskFormWithContext({ editingTaskId }: { editingTaskId: string | null }) {
  const { setIsFormOpen, setEditingTaskId } = TaskContextModule.useTaskContext();

  React.useEffect(() => {
    setIsFormOpen(true);
    setEditingTaskId(editingTaskId);
  }, [editingTaskId, setIsFormOpen, setEditingTaskId]);

  return <TaskForm />;
}
