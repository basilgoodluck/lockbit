// Storage.tsx
import toast from "react-hot-toast";
import { TrendingUp, Check } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
import { useState } from "react";
import { createPortal } from "react-dom";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$6/mo",
    storage: "20GB",
    features: ["20GB Storage", "Basic support", "Standard API calls"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12/mo",
    storage: "50GB",
    features: ["50GB Storage", "Priority support", "Unlimited API calls"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    storage: "Unlimited",
    features: ["Unlimited Storage", "Dedicated support", "SLA guarantee"],
  },
];

function UpgradeModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState("pro");

  const handleConfirm = () => {
    onClose();
    toast.success(`Upgraded to ${PLANS.find((p) => p.id === selected)?.name} plan!`);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl w-full max-w-2xl mx-4 p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Upgrade Storage</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Choose a plan to expand your storage.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {PLANS.map((plan) => {
            const isSelected = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
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
            onClick={handleConfirm}
            className="px-3 py-1.5 text-xs font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-200"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function StorageSettings() {
  const [showModal, setShowModal] = useState(false);
  const storage = { used: 2.5, total: 5 };
  const percentage = (storage.used / storage.total) * 100;

  return (
    <>
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
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <TrendingUp size={14} />
            Upgrade
          </button>
        </div>
      </SettingsCard>

      {showModal && <UpgradeModal onClose={() => setShowModal(false)} />}
    </>
  );
}