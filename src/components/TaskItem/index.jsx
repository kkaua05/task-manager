import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { getPriorityColor, getPriorityLabel, formatDate } from '../../utils/helpers';
import { Check, Trash2, Calendar, Tag } from 'lucide-react';
import './TaskItem.css';

const TaskItem = ({ task, index }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Trabalho': '#10b981',
      'Estudos': '#14b8a6',
      'Pessoal': '#84cc16',
      'Compras': '#f59e0b',
      'Saúde': '#ef4444',
      'Outros': '#6b7280'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div 
      className={`task-card hover-lift ${task.completed ? 'completed' : ''}`}
      style={{ 
        borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
        animationDelay: `${index * 0.08}s`
      }}
    >
      <div className="task-checkbox" onClick={toggleComplete}>
        <div className={`checkbox-custom ${task.completed ? 'checked' : ''}`}>
          {task.completed && <Check size={16} />}
        </div>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span 
            className="priority-badge"
            style={{ 
              background: `${getPriorityColor(task.priority)}20`,
              color: getPriorityColor(task.priority),
              boxShadow: `0 0 15px ${getPriorityColor(task.priority)}40`
            }}
          >
            {getPriorityLabel(task.priority)}
          </span>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span 
            className="badge category-badge"
            style={{ 
              background: `${getCategoryColor(task.category)}15`,
              color: getCategoryColor(task.category)
            }}
          >
            <Tag size={12} />
            {task.category}
          </span>
          {task.dueDate && (
            <span className="badge date-badge">
              <Calendar size={12} />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <button 
        className="delete-btn hover-scale" 
        onClick={() => deleteTask(task.id)}
        title="Excluir tarefa"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskItem;