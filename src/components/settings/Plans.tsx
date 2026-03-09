// Plans.tsx
import toast from "react-hot-toast";
import { ExternalLink, Check } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
import { useState } from "react";
import { createPortal } from "react-dom";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0/mo",
    storage: "5GB",
    quotas: "Limited usage",
    features: ["5GB Storage", "Limited API calls", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12/mo",
    storage: "50GB",
    quotas: "Unlimited usage",
    features: ["50GB Storage", "Unlimited API calls", "Priority support", "Advanced analytics"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    storage: "Unlimited",
    quotas: "Custom limits",
    features: ["Unlimited Storage", "Custom API limits", "Dedicated support", "SLA guarantee", "SSO & audit logs"],
  },
];

function PlanModal({
  selected,
  currentPlan,
  onSelect,
  onConfirm,
  onClose,
}: {
  selected: string;
  currentPlan: string;
  onSelect: (id: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl w-full max-w-2xl mx-4 p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Choose a Plan</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Select the plan that fits your needs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {PLANS.map((plan) => {
            const isSelected = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => onSelect(plan.id)}
                className={`text-left rounded-lg border p-3 transition-all ${
                  isSelected
                    ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800"
                    : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">{plan.name}</span>
                  {isSelected && <Check size={14} className="text-neutral-900 dark:text-white" />}
                </div>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">{plan.price}</p>
                <ul className="space-y-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 inline-block" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={selected === currentPlan}
            className="px-3 py-1.5 text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm Plan
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function PlanSettings() {
  const [currentPlan, setCurrentPlan] = useState("free");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(currentPlan);

  const activePlan = PLANS.find((p) => p.id === currentPlan)!;

  const handleConfirm = () => {
    setCurrentPlan(selected);
    setShowModal(false);
    toast.success(`Switched to ${PLANS.find((p) => p.id === selected)?.name} plan!`);
  };

  return (
    <>
      <SettingsCard title="Subscription Plan">
        <div className="space-y-3">
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {activePlan.name}
              </p>
              <span className="px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded">
                Active
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Storage</span>
                <span className="font-medium text-neutral-900 dark:text-white">{activePlan.storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Quotas</span>
                <span className="font-medium text-neutral-900 dark:text-white">{activePlan.quotas}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => { setSelected(currentPlan); setShowModal(true); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <ExternalLink size={14} />
            View Plans
          </button>
        </div>
      </SettingsCard>

      {showModal && (
        <PlanModal
          selected={selected}
          currentPlan={currentPlan}
          onSelect={setSelected}
          onConfirm={handleConfirm}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}