import { useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';

export const useTasks = () => {
  const { tasks, filter, search } = useContext(TaskContext);

  const filteredTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                           task.description.toLowerCase().includes(search.toLowerCase());
      
      let matchesFilter = true;
      
      switch (filter) {
        case 'completed':
          matchesFilter = task.completed;
          break;
        case 'pending':
          matchesFilter = !task.completed;
          break;
        case 'high':
          matchesFilter = task.priority === 'high';
          break;
        case 'today':
          matchesFilter = task.dueDate === today && !task.completed;
          break;
        case 'overdue':
          matchesFilter = task.dueDate < today && !task.completed;
          break;
        case 'all':
        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });
  }, [tasks, filter, search]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    return { total, completed, pending, highPriority, progress };
  }, [tasks]);

  return { filteredTasks, stats };
};