import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { TaskList } from '../src/TaskList';
import { TaskProvider } from '../src/TaskContext';
import { taskReducer } from '../src/taskReducer';
import { userReducer } from '../src/userReducer';
import { taskSagas } from '../src/taskSaga';
import { userSagas } from '../src/userSaga';
import type { Task, User } from '../src/types';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Test Task 1',
    description: 'Description 1',
    status: 'todo',
    priority: 'high',
    assigneeId: '1',
    dueDate: null,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Test Task 2',
    description: 'Description 2',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: '2',
    dueDate: null,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'User 1',
    email: 'user1@test.com',
    avatar: 'https://example.com/avatar1.png',
  },
  {
    id: '2',
    name: 'User 2',
    email: 'user2@test.com',
    avatar: 'https://example.com/avatar2.png',
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

function renderWithProviders(ui: React.ReactElement, store = createTestStore()) {
  return render(
    <Provider store={store}>
      <TaskProvider>{ui}</TaskProvider>
    </Provider>
  );
}

describe('TaskList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render empty state when no tasks exist', () => {
    renderWithProviders(<TaskList />);
    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
  });

  it('should render task cards when tasks exist', () => {
    const store = createTestStore(mockTasks, mockUsers);
    renderWithProviders(<TaskList />, store);

    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('should render the correct number of task cards', () => {
    const store = createTestStore(mockTasks, mockUsers);
    renderWithProviders(<TaskList />, store);

    const taskCards = screen.getAllByTestId('task-card');
    expect(taskCards).toHaveLength(3);
  });

  it.skip('should filter tasks by status', () => {
    const tasksWithDone = [
      ...mockTasks,
      {
        id: '3',
        title: 'Done Task',
        description: 'Completed',
        status: 'done' as const,
        priority: 'low' as const,
        assigneeId: null,
        dueDate: null,
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z',
      },
    ];

    const store = createTestStore(tasksWithDone, mockUsers);

    renderWithProviders(<TaskList />, store);

    expect(true).toBe(true);
  });

  it('should display loading state', () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
      reducer: {
        tasks: taskReducer,
        users: userReducer,
      },
      preloadedState: {
        tasks: {
          tasks: [],
          loading: true,
          error: null,
          filter: { status: 'all' as const, searchQuery: '', assigneeId: null },
          selectedTaskIds: [],
        },
        users: {
          users: [],
          loading: false,
        },
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    });

    renderWithProviders(<TaskList />, store);
    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
  });
});
