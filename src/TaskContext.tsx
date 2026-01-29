import { createContext, useContext, useState, type ReactNode } from 'react';

interface TaskContextValue {
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  
  return (
    <TaskContext.Provider
      value={{
        selectedTaskId,
        setSelectedTaskId,
        isFormOpen,
        setIsFormOpen,
        editingTaskId,
        setEditingTaskId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
}
