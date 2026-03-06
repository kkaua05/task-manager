import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { generateId } from '../../utils/helpers';
import { X, Plus, Calendar, Tag, AlertCircle } from 'lucide-react';
import './TaskForm.css';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    priority: 'medium', 
    dueDate: '', 
    category: 'Trabalho'
  });

  const categories = ['Trabalho', 'Estudos', 'Pessoal', 'Compras', 'Saúde', 'Outros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    addTask({
      id: generateId(),
      ...formData,
      completed: false,
      createdAt: new Date().toISOString()
    });
    
    setFormData({ 
      title: '', 
      description: '', 
      priority: 'medium', 
      dueDate: '', 
      category: 'Trabalho' 
    });
    setIsOpen(false);
  };

  const handleClose = () => {
    setFormData({ 
      title: '', 
      description: '', 
      priority: 'medium', 
      dueDate: '', 
      category: 'Trabalho' 
    });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button className="fab animate-pulse-ring" onClick={() => setIsOpen(true)}>
        <Plus size={24} className="fab-icon" />
        <span className="fab-text">Nova Tarefa</span>
      </button>
    );
  }

  return (
    <div className="modal-overlay animate-fade-in" onClick={handleClose}>
      <form 
        className="task-form-card animate-scale-in-bounce" 
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-header">
          <h2 className="gradient-text">🌿 Nova Tarefa</h2>
          <button type="button" className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="form-group">
          <label><AlertCircle size={14} /> Título *</label>
          <input 
            autoFocus
            type="text"
            placeholder="O que precisa ser feito?" 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea 
            placeholder="Adicione detalhes..." 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            rows="3"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Prioridade</label>
            <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
              <option value="low">🟢 Baixa</option>
              <option value="medium">🟡 Média</option>
              <option value="high">🔴 Alta</option>
            </select>
          </div>

          <div className="form-group">
            <label><Calendar size={14} /> Data Limite</label>
            <input 
              type="date" 
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
        </div>

        <div className="form-group">
          <label><Tag size={14} /> Categoria</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleClose}>Cancelar</button>
          <button type="submit" className="primary-btn hover-glow">
            <Plus size={18} />
            Salvar Tarefa
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;