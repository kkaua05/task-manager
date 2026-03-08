import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useTasks } from '../../hooks/useTasks';
import { 
  LayoutDashboard, 
  Calendar, 
  Flag, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  Zap,
  FolderOpen,
  Settings,
  User,
  LogOut,
  Bell,
  Moon,
  AlertCircle,
  Coffee,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { filter, setFilter, tasks } = useContext(TaskContext);
  const { stats } = useTasks();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Calcular tarefas por categoria
  const getCategoryCount = (categoryName) => {
    return tasks.filter(task => task.category === categoryName).length;
  };

  const categories = [
    { name: 'Trabalho', color: '#10b981', icon: '💼' },
    { name: 'Estudos', color: '#14b8a6', icon: '📚' },
    { name: 'Pessoal', color: '#84cc16', icon: '👤' },
    { name: 'Compras', color: '#f59e0b', icon: '🛒' },
    { name: 'Saúde', color: '#ef4444', icon: '🏥' },
    { name: 'Outros', color: '#6b7280', icon: '📦' },
  ];

  const menuItems = [
    { id: 'all', label: 'Todas as Tarefas', icon: LayoutDashboard, description: 'Visualize todas' },
    { id: 'today', label: 'Hoje', icon: Calendar, description: 'Tarefas de hoje' },
    { id: 'high', label: 'Alta Prioridade', icon: Flag, description: 'Prioridade máxima' },
    { id: 'pending', label: 'Pendentes', icon: Clock, description: 'Aguardando' },
    { id: 'completed', label: 'Concluídas', icon: CheckCircle2, description: 'Finalizadas' },
  ];

  const handleCategoryClick = (categoryName) => {
    // Filtrar por categoria (você pode implementar um filtro específico)
    alert(`Filtrando por categoria: ${categoryName}`);
    // Ou implemente um novo filtro no context
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'Produtividade':
        alert('📊 Relatório de Produtividade\n\nTarefas concluídas: ' + stats.completed + '\nTotal de tarefas: ' + stats.total + '\nProgresso: ' + stats.progress + '%');
        break;
      case 'Green Edition':
        alert('🌿 Green Edition\n\nTema ecológico ativado\nEconomia de energia: Modo escuro\nInterface otimizada');
        break;
      default:
        break;
    }
  };

  const handleNotification = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
    alert('⚙️ Configurações\n\n• Tema: Dark Mode\n• Idioma: Português\n• Notificações: Ativadas\n• Sincronização: Automática');
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      alert('👋 Até logo!\n\nVocê saiu do sistema.');
      // Aqui você implementaria o logout real
    }
  };

  const getNotificationCount = () => {
    const overdueTasks = tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      return new Date(task.dueDate) < new Date();
    }).length;
    return overdueTasks;
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon animate-pulse-glow">
            <Sparkles size={24} />
          </div>
          <span className="logo-text gradient-text">Task Manager</span>
        </div>
      </div>

      {/* Progresso Geral */}
      <div className="sidebar-progress">
        <div className="progress-header">
          <span>Progresso</span>
          <span className="progress-percentage">{stats.progress}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${stats.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="nav-menu">
        <div className="menu-section">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = filter === item.id;
            
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setFilter(item.id)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`nav-icon-wrapper ${isActive ? 'active' : ''}`}>
                  <Icon size={18} />
                </div>
                <div className="nav-content">
                  <span className="nav-label">{item.label}</span>
                  {item.description && (
                    <span className="nav-description">{item.description}</span>
                  )}
                </div>
                {isActive && <div className="nav-dot" />}
              </button>
            );
          })}
        </div>

        {/* Estatísticas */}
        <div className="stats-section">
          <div className="section-header">
            <TrendingUp size={16} />
            <span>Estatísticas</span>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-box primary">
                <TrendingUp size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-text">Total de Tarefas</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-box success">
                <CheckCircle2 size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-number">{stats.completed}</span>
                <span className="stat-text">Concluídas</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-box warning">
                <Clock size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-number">{stats.pending}</span>
                <span className="stat-text">Pendentes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div className="categories-section">
          <div className="section-header">
            <FolderOpen size={16} />
            <span>Categorias</span>
          </div>
          
          {categories.map((cat, index) => {
            const count = getCategoryCount(cat.name);
            return (
              <button
                key={cat.name}
                className="category-item"
                onClick={() => handleCategoryClick(cat.name)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
                <span 
                  className="category-count"
                  style={{ 
                    background: `${cat.color}20`,
                    color: cat.color,
                    border: `1px solid ${cat.color}40`
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Ações Rápidas */}
        <div className="quick-actions-section">
          <div className="section-header">
            <Zap size={16} />
            <span>Ações Rápidas</span>
          </div>
          
          <button 
            className="quick-action-btn"
            onClick={() => handleQuickAction('Produtividade')}
          >
            <TrendingUp size={18} />
            <span>Produtividade</span>
          </button>
          
          <button 
            className="quick-action-btn"
            onClick={() => handleQuickAction('Green Edition')}
          >
            <Zap size={18} />
            <span>Green Edition</span>
          </button>
        </div>
      </nav>

      {/* Footer com Usuário */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">
            <User size={24} />
          </div>
          <div className="user-details">
            <span className="user-name">Usuário</span>
            <span className="user-email">usuario@email.com</span>
          </div>
        </div>

        <div className="footer-buttons">
          <button 
            className="footer-btn"
            onClick={handleSettings}
            title="Configurações"
          >
            <Settings size={20} />
          </button>
          
          <button 
            className="footer-btn notification-btn"
            onClick={handleNotification}
            title="Notificações"
          >
            <Bell size={20} />
            {getNotificationCount() > 0 && (
              <span className="notification-badge">{getNotificationCount()}</span>
            )}
          </button>
          
          <button 
            className="footer-btn logout-btn"
            onClick={handleLogout}
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>

        <div className="footer-version">
          <Zap size={12} />
          <span>Green Edition v2.0</span>
        </div>
      </div>

      {/* Modal de Notificações */}
      {showNotifications && (
        <div className="modal-overlay" onClick={() => setShowNotifications(false)}>
          <div className="notification-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><Bell size={20} /> Notificações</h3>
              <button onClick={() => setShowNotifications(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              {getNotificationCount() > 0 ? (
                <div className="notification-item warning">
                  <AlertCircle size={20} />
                  <div>
                    <strong>{getNotificationCount()} tarefas atrasadas</strong>
                    <p>Você tem tarefas pendentes vencidas</p>
                  </div>
                </div>
              ) : (
                <div className="no-notifications">
                  <CheckCircle2 size={48} />
                  <p>Tudo em dia!</p>
                  <span>Nenhuma notificação pendente</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
