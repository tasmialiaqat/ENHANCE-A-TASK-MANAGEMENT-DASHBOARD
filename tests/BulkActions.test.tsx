import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BulkActions } from '../src/BulkActions';
import { taskReducer } from '../src/taskReducer';
import { userReducer } from '../src/userReducer';

function createTestStore(selectedTaskIds: string[] = []) {
  return configureStore({
    reducer: {
      tasks: taskReducer,
      users: userReducer,
    },
    preloadedState: {
      tasks: {
        tasks: [],
        loading: false,
        error: null,
        filter: { status: 'all' as const, searchQuery: '', assigneeId: null },
        selectedTaskIds,
      },
      users: {
        users: [],
        loading: false,
      },
    },
  });
}

describe('BulkActions', () => {
  it('should not render when no tasks are selected', () => {
    const store = createTestStore([]);
    render(
      <Provider store={store}>
        <BulkActions />
      </Provider>
    );
    expect(screen.queryByTestId('bulk-actions')).not.toBeInTheDocument();
  });

  it.todo('should display count of selected tasks');

  it.todo('should clear selection when button is clicked');

  it.todo('should show confirmation dialog before bulk delete');

  it.todo('should dispatch bulk delete action when confirmed');

  it.todo('should dispatch bulk status change action');

  it('should render when tasks are selected', () => {
    const store = createTestStore(['1', '2']);
    render(
      <Provider store={store}>
        <BulkActions />
      </Provider>
    );
    expect(screen.getByTestId('bulk-actions')).toBeInTheDocument();
  });
});
