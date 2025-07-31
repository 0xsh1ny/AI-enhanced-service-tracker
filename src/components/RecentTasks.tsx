import React from 'react';
import { Clock, User, AlertCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  client: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  price: number;
  aiSummary: string;
}

interface RecentTasksProps {
  tasks: Task[];
}

const RecentTasks: React.FC<RecentTasksProps> = ({ tasks }) => {
  const recentTasks = tasks.slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'pending': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-xl">
      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-3 sm:mb-4 lg:mb-6">Recent Tasks</h3>
      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
        {recentTasks.map((task) => (
          <div key={task.id} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-xs sm:text-sm lg:text-base truncate">{task.title}</h4>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-4 mt-1 lg:mt-2 text-xs">
                  <div className="flex items-center gap-1 text-gray-300">
                    <User className="w-3 h-3" />
                    <span className="truncate max-w-16 sm:max-w-20 lg:max-w-none">{task.client}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-300">
                    <Clock className="w-3 h-3" />
                    <span>{task.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className={`w-3 h-3 ${getPriorityColor(task.priority)}`} />
                    <span className={`capitalize ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1 lg:mt-2 line-clamp-2 hidden sm:block">{task.aiSummary}</p>
              </div>
              <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 lg:gap-1 text-right">
                <span className={`text-xs font-medium capitalize ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-semibold text-white">€{task.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTasks;