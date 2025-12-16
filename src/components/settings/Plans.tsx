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
        {/* Current Plan Card */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-lg font-bold text-neutral-900 dark:text-white">
                {plan.name} Plan
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                Current subscription
              </p>
            </div>
            <div className="px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
              Active
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <Database size={14} className="text-blue-600 dark:text-blue-400" />
              Storage: <span className="font-semibold">{plan.storage}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <Zap size={14} className="text-blue-600 dark:text-blue-400" />
              Quotas: <span className="font-semibold">{plan.quotas}</span>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
            <p className="text-xs font-semibold text-neutral-900 dark:text-white">
              Upgrade for more features
            </p>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            Get unlimited storage, priority support, and advanced encryption
          </p>
          <button
            onClick={handleChangePlan}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ExternalLink size={14} />
            View Plans
          </button>
        </div>
      </div>
    </SettingsCard>
  );
}
