// Storage.tsx
import toast from "react-hot-toast";
import { TrendingUp } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

export function StorageSettings() {
  const storage = { used: 2.5, total: 5 };
  const percentage = (storage.used / storage.total) * 100;

  const handleUpgrade = () => {
    window.open("https://x.ai/grok", "_blank");
    toast.success("Redirecting to upgrade options...");
  };

  return (
<<<<<<< HEAD
    <SettingsCard title="Storage">
      <div className="space-y-3">
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-md p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {storage.used} GB of {storage.total} GB used
            </p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              {percentage.toFixed(0)}%
            </p>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-neutral-600 dark:bg-neutral-400 rounded-full transition-all duration-500"
=======
    <SettingsCard
      title="Storage Settings"
      description="View and manage your storage usage"
    >
      <div className="space-y-4">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Storage Usage
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {storage.used} GB of {storage.total} GB used
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                {percentage.toFixed(0)}%
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                used
              </p>
            </div>
          </div>

          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
>>>>>>> 05ce34ae4a264c01c90027fdf3a6bf1aa1a2b5a4
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
<<<<<<< HEAD
        
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-md p-2">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Encrypted Files</p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">1.8 GB</p>
          </div>
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-md p-2">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Total Files</p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">247</p>
          </div>
        </div>
        
        <button
          onClick={handleUpgrade}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <TrendingUp size={14} />
          Upgrade
=======

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Encrypted Files</p>
            <p className="text-base font-semibold text-neutral-900 dark:text-white">1.8 GB</p>
          </div>
          <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Total Files</p>
            <p className="text-base font-semibold text-neutral-900 dark:text-white">247</p>
          </div>
        </div>

        <button
          onClick={handleUpgrade}
          className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-neutral-700 hover:bg-neutral-800 dark:bg-neutral-600 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
        >
          <TrendingUp size={16} />
          Upgrade Storage
>>>>>>> 05ce34ae4a264c01c90027fdf3a6bf1aa1a2b5a4
        </button>
      </div>
    </SettingsCard>
  );
}