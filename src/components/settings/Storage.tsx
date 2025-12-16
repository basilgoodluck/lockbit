import toast from "react-hot-toast";
import { HardDrive, TrendingUp } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

export function StorageSettings() {
  const storage = { used: 2.5, total: 5 }; // Mock data in GB
  const percentage = (storage.used / storage.total) * 100;

  const handleUpgrade = () => {
    window.open("https://x.ai/grok", "_blank");
    toast.success("Redirecting to upgrade options...");
  };

  return (
    <SettingsCard
      title="Storage Settings"
      description="View and manage your storage usage"
    >
      <div className="space-y-5">
        {/* Storage Overview */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-center">
              <HardDrive size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                Storage Usage
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {storage.used} GB of {storage.total} GB used
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                {percentage.toFixed(1)}% used
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {(storage.total - storage.used).toFixed(1)} GB free
              </span>
            </div>
          </div>
        </div>

        {/* Storage Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Encrypted Files</p>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">1.8 GB</p>
          </div>
          <div className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Total Files</p>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">247</p>
          </div>
        </div>

        {/* Upgrade Section */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg mb-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                  Need more space?
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Upgrade to Pro for 50GB storage and advanced features
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <TrendingUp size={16} />
            Upgrade Storage
          </button>
        </div>
      </div>
    </SettingsCard>
  );
}
