import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TasksView } from './components/TasksView';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';
import { generateAISummary } from './utils/aiSummary';

interface Task {
  id: string;
  title: string;
  client: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in-progress' | 'overdue' | 'pending';
  price: number;
  timeTracked: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  aiSummary: string;
  tags: string[];
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    client: 'Acme Corp',
    deadline: '2025-01-15',
    priority: 'high',
    status: 'in-progress',
    price: 5500,
    timeTracked: 32,
    paymentStatus: 'pending',
    aiSummary: generateAISummary('E-commerce Platform Development'),
    tags: ['development', 'e-commerce', 'urgent']
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    client: 'Tech Solutions',
    deadline: '2025-01-12',
    priority: 'medium',
    status: 'completed',
    price: 2800,
    timeTracked: 24,
    paymentStatus: 'paid',
    aiSummary: generateAISummary('Mobile App UI/UX Design'),
    tags: ['design', 'mobile', 'ui/ux']
  },
  {
    id: '3',
    title: 'Database Optimization',
    client: 'StartupXYZ',
    deadline: '2025-01-10',
    priority: 'high',
    status: 'overdue',
    price: 3200,
    timeTracked: 18,
    paymentStatus: 'overdue',
    aiSummary: generateAISummary('Database Optimization'),
    tags: ['database', 'optimization', 'performance']
  },
  {
    id: '4',
    title: 'API Documentation',
    client: 'AppCo',
    deadline: '2025-01-18',
    priority: 'low',
    status: 'pending',
    price: 950,
    timeTracked: 0,
    paymentStatus: 'pending',
    aiSummary: generateAISummary('API Documentation'),
    tags: ['documentation', 'api']
  },
];

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'tasks' | 'settings'>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} />;
      case 'tasks':
        return <TasksView tasks={tasks} setTasks={setTasks} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard tasks={tasks} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative z-10 flex h-screen">
        <Navigation 
          currentView={currentView} 
          onViewChange={setCurrentView}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="flex-1 overflow-hidden md:ml-0">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;