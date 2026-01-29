import { Provider } from 'react-redux';
import { store } from './store';
import { TaskProvider, useTaskContext } from './TaskContext';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { TaskFilter } from './TaskFilter';
import { TaskStats } from './TaskStats';
import styles from './styles.module.scss';

function AppContent() {
  const { setIsFormOpen } = useTaskContext();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>TaskFlow</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className={styles.createButton}
          data-testid="create-task-button"
        >
          + New Task
        </button>
      </header>

      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <TaskStats />
        </aside>

        <section className={styles.content}>
          <TaskFilter />
          <TaskList />
        </section>
      </main>

      <TaskForm />
    </div>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </Provider>
  );
}
