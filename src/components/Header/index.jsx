import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useTasks } from '../../hooks/useTasks';
import { Search, Trash2, TrendingUp } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { search, setSearch, clearCompleted } = useContext(TaskContext);
  const { stats } = useTasks();

  return (
    <header className="header animate-fade-in-down">
      <div className="header-content">
        <div className="header-title">
          <h1 className="gradient-text">Dashboard</h1>
          <p className="header-subtitle">Gerencie suas tarefas com eficiência</p>
        </div>
        
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Buscar tarefas..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="stats-card animate-scale-in">
        <div className="stat-info">
          <div className="stat-icon">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3>Progresso</h3>
            <p className="stat-details">
              {stats.completed}/{stats.total} tarefas
            </p>
          </div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill animate-border-glow"
            style={{ width: `${stats.progress}%` }}
          ></div>
        </div>
        <div className="stat-percent gradient-text">{stats.progress}%</div>
      </div>

      {stats.completed > 0 && (
        <button 
          className="clear-btn hover-glow"
          onClick={clearCompleted}
          title="Limpar concluídas"
        >
          <Trash2 size={20} />
        </button>
      )}
    </header>
  );
};

export default Header;