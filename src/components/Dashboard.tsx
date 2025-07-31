import React from 'react';
import { StatsCard } from './StatsCard';
import RecentTasks from './RecentTasks';
import { ClientOverview } from './ClientOverview';
import { Users, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  tasks: Array<{
    id: string;
    status: 'completed' | 'in-progress' | 'overdue' | 'pending';
  }>;
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const activeTasks = tasks.filter(task => task.status === 'in-progress').length;

  return (
    <div className="p-3 sm:p-6 lg:p-8 h-full overflow-y-auto pt-20 md:pt-3 sm:pt-6 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/70 text-xs sm:text-sm lg:text-base">Your service work overview at a glance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <StatsCard
            title="Total Tasks"
            value={totalTasks.toString()}
            icon={CheckCircle2}
            color="blue"
          />
          <StatsCard
            title="Completed"
            value={completedTasks.toString()}
            icon={CheckCircle2}
            color="green"
          />
          <StatsCard
            title="Overdue"
            value={overdueTasks.toString()}
            icon={AlertTriangle}
            color="red"
          />
          <StatsCard
            title="In Progress"
            value={activeTasks.toString()}
            icon={Users}
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <RecentTasks tasks={tasks} />
          </div>
          <div>
            <ClientOverview />
          </div>
        </div>
      </div>
    </div>
  );
};