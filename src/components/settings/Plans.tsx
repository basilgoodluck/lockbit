import toast from "react-hot-toast";
import { ExternalLink, Sparkles, Database, Zap } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
import { useState } from "react";

export function PlanSettings() {
  const [plan] = useState({ 
    name: "Free", 
    storage: "5GB", 
    quotas: "Limited usage" 
  });

  const handleChangePlan = () => {
    window.open("https://x.ai/grok", "_blank");
    toast.success("Redirecting to plan options...");
  };

  return (
    <SettingsCard
      title="Subscription Plan"
      description="Manage your subscription and view plan details"
    >
      <div className="space-y-4">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-base font-semibold text-neutral-900 dark:text-white">
                {plan.name} Plan
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Current subscription
              </p>
            </div>
            <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-md">
              Active
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">Storage</span>
              <span className="font-medium text-neutral-900 dark:text-white">{plan.storage}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">Quotas</span>
              <span className="font-medium text-neutral-900 dark:text-white">{plan.quotas}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleChangePlan}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-neutral-700 hover:bg-neutral-800 dark:bg-neutral-600 dark:hover:bg-neutral-700 transition-colors"
        >
          <ExternalLink size={16} />
          View Available Plans
        </button>
      </div>
    </SettingsCard>
  );
}