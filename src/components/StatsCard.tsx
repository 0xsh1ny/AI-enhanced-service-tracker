import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'red' | 'purple';
  trend?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-4 lg:p-6 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70 text-xs sm:text-sm font-medium">{title}</p>
          <p className="text-lg sm:text-xl lg:text-3xl font-bold text-white mt-1 sm:mt-2">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 bg-gradient-to-r ${colorClasses[color]} rounded-lg sm:rounded-xl`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
        </div>
      </div>
    </div>
  );
};