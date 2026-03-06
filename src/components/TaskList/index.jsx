import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from '../TaskItem';
import './TaskList.css';

const TaskList = () => {
  const { tasks, filter, search } = useContext(TaskContext);

  const tasksArray = Array.isArray(tasks) ? tasks : [];

  const filteredTasks = tasksArray.filter(task => {
    if (!task) return false;
    
    const searchLower = (search || '').toLowerCase();
    const taskTitle = (task.title || '').toLowerCase();
    const matchesSearch = taskTitle.includes(searchLower);
    
    if (filter === 'completed') return task.completed && matchesSearch;
    if (filter === 'pending') return !task.completed && matchesSearch;
    if (filter === 'high') return task.priority === 'high' && matchesSearch;
    
    return matchesSearch;
  });

  const getFilterTitle = () => {
    const titles = {
      'all': 'Todas as Tarefas',
      'today': 'Tarefas de Hoje',
      'high': 'Alta Prioridade',
      'pending': 'Pendentes',
      'completed': 'Concluídas'
    };
    return titles[filter] || 'Tarefas';
  };

  return (
    <div className="task-list-container animate-fade-in-up">
      <div className="task-list-header">
        <h2 className="list-title gradient-text">{getFilterTitle()}</h2>
        <span className="task-count">{filteredTasks.length} tarefas</span>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state animate-scale-in">
          <div className="empty-icon animate-float">📭</div>
          <h3>Nenhuma tarefa encontrada</h3>
          <p>Crie uma nova tarefa para começar!</p>
        </div>
      ) : (
        <div className="task-list stagger-children">
          {filteredTasks.map((task, index) => (
            <TaskItem 
              key={task.id} 
              task={task}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;