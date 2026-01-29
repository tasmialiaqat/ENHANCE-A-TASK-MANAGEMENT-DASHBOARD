import styles from './styles.module.scss';

interface TaskDueDateProps {
  dueDate: string | null;
  status: string;
}

export function TaskDueDate({ dueDate, status }: TaskDueDateProps) {
  if (!dueDate) {
    return <span className={styles.noDueDate}>No due date</span>;
  }

  return (
    <span className={styles.dueDate}>
      Due: {dueDate}
    </span>
  );
}
