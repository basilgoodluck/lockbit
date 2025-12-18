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
              className="h-full bg-neutral-600 dark:bg-neutral-400 rounded-full transition-all duration-50
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        
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
        </button>
      </div>
    </SettingsCard>
  );
}