import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { generateId } from '../../utils/helpers';
import { X, Plus, Calendar, Tag, AlertCircle, CheckCircle2 } from 'lucide-react';
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
      <button className="fab" onClick={() => setIsOpen(true)}>
        <Plus size={24} className="fab-icon" />
        <span className="fab-text">Nova Tarefa</span>
      </button>
    );
  }

  return (
    <div className="task-form-area">
      <div className="form-card">
        <div className="form-header">
          <div className="header-left">
            <div className="icon-wrapper">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h2 className="gradient-text">Nova Tarefa</h2>
              <p>Preencha os detalhes para criar uma nova tarefa</p>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-row">
            <div className="form-group">
              <label><AlertCircle size={14} /> Título *</label>
              <input 
                autoFocus
                type="text"
                placeholder="Ex: Finalizar relatório mensal" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Descrição</label>
              <textarea 
                placeholder="Descreva os detalhes, objetivos e requisitos da tarefa..." 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                rows="3"
              />
            </div>
          </div>

          <div className="form-row-double">
            <div className="form-group">
              <label><Tag size={14} /> Prioridade</label>
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

          <div className="form-row">
            <div className="form-group full">
              <label><Tag size={14} /> Categoria</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              <CheckCircle2 size={18} />
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
