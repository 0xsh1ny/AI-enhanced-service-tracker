import React from 'react';
import { Building2, TrendingUp, Clock } from 'lucide-react';

interface Client {
  name: string;
  tasksCount: number;
  totalValue: number;
  status: 'active' | 'completed' | 'pending';
}

const mockClients: Client[] = [
  { name: 'Acme Corp', tasksCount: 4, totalValue: 8500, status: 'active' },
  { name: 'Tech Solutions', tasksCount: 3, totalValue: 6200, status: 'active' },
  { name: 'StartupXYZ', tasksCount: 2, totalValue: 4800, status: 'pending' },
  { name: 'AppCo', tasksCount: 5, totalValue: 12300, status: 'completed' },
  { name: 'WebDev Inc', tasksCount: 1, totalValue: 2200, status: 'active' },
];

export const ClientOverview: React.FC = () => {
  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'completed': return 'bg-blue-500/20 text-blue-300';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Client List */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Active Clients</h3>
        
        <div className="space-y-4">
          {mockClients.map((client, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-white font-medium text-sm sm:text-base">{client.name}</h4>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>
              
              <div className="flex justify-between text-xs sm:text-sm text-white/60 ml-9">
                <span>{client.tasksCount} tasks</span>
                <span>${client.totalValue.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};