import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Flag, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { filter, setFilter } = useContext(TaskContext);

  const menuItems = [
    { id: 'all', label: 'Todas as Tarefas', icon: LayoutDashboard },
    { id: 'today', label: 'Hoje', icon: Calendar },
    { id: 'high', label: 'Alta Prioridade', icon: Flag },
    { id: 'pending', label: 'Pendentes', icon: Clock },
    { id: 'completed', label: 'Concluídas', icon: CheckCircle2 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon animate-pulse-glow">
            <Sparkles size={24} />
          </div>
          <span className="logo-text gradient-text">TaskControl</span>
        </div>
      </div>
      
      <nav className="nav-menu stagger-children">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = filter === item.id;
          
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setFilter(item.id)}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={`nav-icon-wrapper ${isActive ? 'active' : ''}`}>
                <Icon size={20} className="nav-icon" />
              </div>
              <span className="nav-label">{item.label}</span>
              {isActive && <div className="nav-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="footer-stats">
          <div className="stat-item">
            <TrendingUp size={16} />
            <span>Produtividade</span>
          </div>
        </div>
        <div className="footer-content">
          <Zap size={14} />
          <span>Green Edition</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;