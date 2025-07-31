import React, { useState } from 'react';
import { 
  Bell, 
  Database, 
  Key, 
  Zap, 
  ExternalLink,
  Check,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [notionToken, setNotionToken] = useState('');
  const [notionDbId, setNotionDbId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleNotionConnect = () => {
    if (notionToken && notionDbId) {
      // In a real app, you would validate the connection here
      console.log('Connecting to Notion with:', { notionToken: notionToken.substring(0, 10) + '...', notionDbId });
      setIsConnected(true);
    } else {
      alert('Please enter both Notion token and database ID');
    }
  };

  const handleSync = () => {
    if (!isConnected) {
      alert('Please connect to Notion first');
      return;
    }
    setIsSyncing(true);
    // In a real app, you would sync with Notion API here
    console.log('Syncing with Notion...');
    setTimeout(() => {
      setIsSyncing(false);
      alert('Sync completed successfully!');
    }, 2000);
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 h-full overflow-y-auto pt-20 md:pt-3 sm:pt-6 lg:pt-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/70 text-xs sm:text-sm lg:text-base">Configure integrations and preferences</p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Notion Integration */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-4 lg:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Notion Integration</h3>
                <p className="text-white/60 text-xs sm:text-sm">Sync tasks with your Notion database</p>
              </div>
              {isConnected && (
                <div className="ml-auto flex items-center gap-2 px-2 sm:px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs sm:text-sm">
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Connected</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Notion Integration Token
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={notionToken}
                    onChange={(e) => setNotionToken(e.target.value)}
                    placeholder="Enter your Notion integration token..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  />
                  <Key className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Tasks Database ID
                </label>
                <input
                  type="text"
                  value={notionDbId}
                  onChange={(e) => setNotionDbId(e.target.value)}
                  placeholder="Enter your Notion database ID..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleNotionConnect}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm"
                >
                  Connect to Notion
                </button>
                
                {isConnected && (
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 text-white rounded-lg sm:rounded-xl hover:bg-white/20 transition-all duration-200 font-medium disabled:opacity-50 text-sm"
                  >
                    <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                  </button>
                )}
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg sm:rounded-xl">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-200">
                  <p className="font-medium mb-1">How to set up Notion integration:</p>
                  <ol className="list-decimal list-inside space-y-1 text-blue-200/80 text-xs sm:text-sm">
                    <li>Go to <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">notion.so/my-integrations</a></li>
                    <li>Click "New integration" and give it a name</li>
                    <li>Copy the "Internal Integration Token" and paste it above</li>
                    <li>Create a database in Notion with "Name" (title) and "Description" (text) properties</li>
                    <li>Share the database with your integration (click Share → Add people → search for your integration)</li>
                    <li>Copy the database ID from the URL (32-character string) and paste it above</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary Status */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-3 sm:p-4 lg:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">AI Summary</h3>
                <p className="text-white/60 text-xs sm:text-sm">Automated task summaries enabled</p>
              </div>
              <div className="ml-auto flex items-center gap-2 px-2 sm:px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs sm:text-sm">
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Active</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg sm:rounded-xl">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-green-200">
                <p className="font-medium mb-1">AI summaries are automatically generated</p>
                <p className="text-green-200/80">Every task gets an intelligent summary based on its title and content to help you quickly understand the scope and requirements.</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};