import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <TaskProvider>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Header />
          <TaskList />
          <TaskForm />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;