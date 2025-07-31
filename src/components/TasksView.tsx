import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar, DollarSign, User, Clock } from 'lucide-react';
import { AddTaskModal } from './AddTaskModal';
import { EditTaskModal } from './EditTaskModal';
import { generateAISummary } from '../utils/aiSummary';

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

interface TasksViewProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks, setTasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPaymentStatusColor = (status: Task['paymentStatus']) => {
    switch (status) {
      case 'paid': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'overdue': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed' as const, paymentStatus: 'paid' as const }
          : task
      )
    );
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      timeTracked: 0,
      aiSummary: 'AI-generated summary will be created for this task.',
    };
    setTasks(prevTasks => [...prevTasks, task]);
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 h-full overflow-y-auto pt-20 md:pt-3 sm:pt-6 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Tasks</h1>
            <p className="text-white/70 text-xs sm:text-sm lg:text-base">Manage and track your service tasks</p>
          </div>
          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-xs sm:text-sm lg:text-base"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add</span>
            <span className="hidden lg:inline">Task</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            >
              <option value="all" className="bg-gray-800">All Status</option>
              <option value="pending" className="bg-gray-800">Pending</option>
              <option value="in-progress" className="bg-gray-800">In Progress</option>
              <option value="completed" className="bg-gray-800">Completed</option>
              <option value="overdue" className="bg-gray-800">Overdue</option>
            </select>

          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300">
              {/* Task Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">{task.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {task.client}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {task.deadline}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${task.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.timeTracked}h tracked
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority} priority
                  </span>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
              </div>

              {/* AI Summary */}
              <div className="p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl border-l-4 border-purple-400 mb-4">
                <p className="text-xs sm:text-sm text-white/80 italic">
                  <span className="text-purple-300 font-medium">AI Summary:</span> {task.aiSummary}
                </p>
              </div>

              {/* Task Details */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <span className={`text-xs sm:text-sm font-medium ${getPaymentStatusColor(task.paymentStatus)}`}>
                    Payment: {task.paymentStatus}
                  </span>
                  <div className="flex gap-2">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => handleEditTask(task)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleCompleteTask(task.id)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors text-xs sm:text-sm"
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddTaskModal 
        isOpen={isAddTaskOpen} 
        onClose={() => setIsAddTaskOpen(false)} 
        onAddTask={handleAddTask}
      />
      
      {editingTask && (
        <EditTaskModal 
          task={editingTask}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updatedTask) => {
            setTasks(prevTasks => 
              prevTasks.map(task => 
                task.id === updatedTask.id ? updatedTask : task
              )
            );
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};