import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { taskTriggerActions } from './taskActions';
import { taskActions } from './taskReducer';
import { api } from './api';
import type { Task } from './types';

interface FetchTasksResponse {
  tasks: Task[];
}

interface CreateTaskResponse {
  task: Task;
}

interface UpdateTaskResponse {
  task: Task;
}

function* fetchTasksSaga(): Generator {
  try {
    yield put(taskActions.fetchTasksStarted());
    const response = (yield call(api.fetchTasks)) as FetchTasksResponse;
    yield put(taskActions.fetchTasksSuccess({ tasks: response.tasks }));
  } catch (error) {
    yield put(taskActions.fetchTasksFailure({ error: error instanceof Error ? error.message : 'Failed to fetch tasks' }));
  }
}

function* createTaskSaga(action: ReturnType<typeof taskTriggerActions.createTaskTrigger>): Generator {
  try {
    yield put(taskActions.createTaskStarted());
    const response = (yield call(api.createTask, action.payload.task)) as CreateTaskResponse;
    yield put(taskActions.createTaskSuccess({ task: response.task }));
  } catch (error) {
    yield put(taskActions.createTaskFailure({ error: error instanceof Error ? error.message : 'Failed to create task' }));
  }
}

function* updateTaskSaga(action: ReturnType<typeof taskTriggerActions.updateTaskTrigger>): Generator {
  try {
    const response = (yield call(api.updateTask, action.payload.id, action.payload.updates)) as UpdateTaskResponse;
    yield put(taskActions.updateTaskSuccess({ task: response.task }));
  } catch (error) {
    yield put(taskActions.updateTaskFailure({ error: error instanceof Error ? error.message : 'Failed to update task' }));
  }
}

function* deleteTaskSaga(action: ReturnType<typeof taskTriggerActions.deleteTaskTrigger>): Generator {
  try {
    yield call(api.deleteTask, action.payload.id);
    yield put(taskActions.deleteTaskSuccess({ id: action.payload.id }));
  } catch (error) {
    yield put(taskActions.deleteTaskFailure({ error: error instanceof Error ? error.message : 'Failed to delete task' }));
  }
}

export function* taskSagas(): Generator {
  yield takeEvery(taskTriggerActions.fetchTasksTrigger.type, fetchTasksSaga);
  yield takeLatest(taskTriggerActions.createTaskTrigger.type, createTaskSaga);
  yield takeLatest(taskTriggerActions.updateTaskTrigger.type, updateTaskSaga);
  yield takeLatest(taskTriggerActions.deleteTaskTrigger.type, deleteTaskSaga);
}
