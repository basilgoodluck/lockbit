import toast from "react-hot-toast";
import { HardDrive } from "lucide-react";
import { SettingsCard } from "./Card";

export function StorageSettings() {
  const storage = { used: 2.5, total: 5 }; // Mock data in GB

  const handleUpgrade = () => {
    window.open("https://x.ai/grok", "_blank");
    toast.success("Redirecting to upgrade options...");
  };

  return (
    <SettingsCard
      title="Storage Settings"
      description="View and manage your storage usage."
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Storage Usage
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {storage.used} GB used of {storage.total} GB
          </p>
          <div className="mt-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div
              className="bg-accent-500 h-2 rounded-full"
              style={{ width: `${(storage.used / storage.total) * 100}%` }}
            />
          </div>
        </div>
        <button
          onClick={handleUpgrade}
          className="
            px-4 py-2 rounded-lg text-sm font-semibold
            bg-accent-500 text-white hover:bg-accent-600
            transition-colors
          "
        >
          Upgrade Storage
        </button>
      </div>
    </SettingsCard>
  );
}