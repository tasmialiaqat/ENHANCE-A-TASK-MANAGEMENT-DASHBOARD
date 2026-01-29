import { useState, useEffect } from 'react';
import { useAppSelector } from './hooks';
import { useTaskActions } from './hooks';
import { useTaskContext } from './TaskContext';
import type { RootState, TaskStatus, TaskPriority } from './types';
import styles from './styles.module.scss';

export function TaskForm() {
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const { users } = useAppSelector((state: RootState) => state.users);
  const { createTask, updateTask } = useTaskActions();
  const { isFormOpen, setIsFormOpen, editingTaskId, setEditingTaskId } = useTaskContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assigneeId, setAssigneeId] = useState<string>('');

  const editingTask = editingTaskId ? tasks.find((t) => t.id === editingTaskId) : null;
  
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setAssigneeId(editingTask.assigneeId || '');
    } else {
      resetForm();
    }
  }, [editingTaskId]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('medium');
    setAssigneeId('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority: priority,
      assigneeId: assigneeId || null,
    };

    if (editingTaskId) {
      updateTask(editingTaskId, taskData);
    } else {
      createTask(taskData);
    }

    handleClose();
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingTaskId(null);
    resetForm();
  };

  if (!isFormOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} data-testid="task-form-modal">
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{editingTaskId ? 'Edit Task' : 'Create New Task'}</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              data-testid="title-input"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              data-testid="description-input"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                data-testid="status-input"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                data-testid="priority-input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="assignee">Assignee</label>
            <select
              id="assignee"
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              data-testid="assignee-input"
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={handleClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton} data-testid="submit-button">
              {editingTaskId ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
