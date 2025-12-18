// Plans.tsx
import toast from "react-hot-toast";
import { ExternalLink } from "lucide-react";
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
    <SettingsCard title="Subscription Plan">
      <div className="space-y-3">
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-md p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              {plan.name}
            </p>
            <span className="px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded">
              Active
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Storage</span>
              <span className="font-medium text-neutral-900 dark:text-white">{plan.storage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Quotas</span>
              <span className="font-medium text-neutral-900 dark:text-white">{plan.quotas}</span>
            </div>
          </div>
        </div>
      
        <button
          onClick={handleChangePlan}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <ExternalLink size={14} />
          View Plans
        </button>
      </div>
    </SettingsCard>
  );
}