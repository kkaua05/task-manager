export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Sem data';
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': 
      return 'var(--danger)';
    case 'medium': 
      return 'var(--warning)';
    case 'low': 
      return 'var(--info)';
    default: 
      return 'var(--text-muted)';
  }
};

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high': return 'Alta';
    case 'medium': return 'Média';
    case 'low': return 'Baixa';
    default: return 'Normal';
  }
};