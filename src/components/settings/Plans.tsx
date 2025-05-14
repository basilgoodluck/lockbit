import { useState } from "react";
import toast from "react-hot-toast";
import { ExternalLink } from "lucide-react";
import { SettingsCard } from "./Card";

export function PlanSettings() {
  const [plan, setPlan] = useState({ name: "Free", storage: "5GB", quotas: "Limited Grok 3 usage" });

  const handleChangePlan = () => {
    // Redirect to xAI pricing page (per guidelines)
    window.open("https://x.ai/grok", "_blank");
    toast.success("Redirecting to plan options...");
  };

  return (
    <SettingsCard
      title="Subscription Plan"
      description="Manage your subscription plan and view details."
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Current Plan: {plan.name}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Storage: {plan.storage}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Quotas: {plan.quotas}
          </p>
        </div>
        <button
          onClick={handleChangePlan}
          className="
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
            bg-accent-500 text-white hover:bg-accent-600
            transition-colors
          "
        >
          <ExternalLink size={16} />
          Change Plan
        </button>
      </div>
    </SettingsCard>
  );
}