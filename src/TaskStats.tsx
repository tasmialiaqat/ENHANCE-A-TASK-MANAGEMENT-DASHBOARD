import { useEffect, useState } from 'react';
import { useAppSelector } from './hooks';
import type { RootState } from './types';
import styles from './styles.module.scss';

interface TaskStatsProps {
  title?: string;
}

export function TaskStats({ title }: TaskStatsProps) {
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
    highPriority: tasks.filter((t) => t.priority === 'high').length,
  };

  const completionRate = stats.total > 0
    ? Math.round((stats.done / stats.total) * 100)
    : 0;

  const isCompact = windowWidth < 768;

  return (
    <div className={`${styles.statsContainer} ${isCompact ? styles.compact : ''}`} data-testid="task-stats">
      <h2 className={styles.statsTitle}>{title} Statistics</h2>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Total Tasks</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.todo}</div>
          <div className={styles.statLabel}>To Do</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.inProgress}</div>
          <div className={styles.statLabel}>In Progress</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.done}</div>
          <div className={styles.statLabel}>Completed</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue}>{completionRate}%</div>
          <div className={styles.statLabel}>Completion Rate</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.highPriority}</div>
          <div className={styles.statLabel}>High Priority</div>
        </div>
      </div>
    </div>
  );
}
