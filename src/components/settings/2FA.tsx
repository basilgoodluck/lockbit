// 2FA.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import { Shield } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
export function TwoFactorSettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const handleToggle2FA = () => {
    console.log("Toggling 2FA:", !is2FAEnabled);
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(`2FA ${is2FAEnabled ? "disabled" : "enabled"}!`);
  };
  return (
    <SettingsCard title="Two-Factor Authentication">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-neutral-900 dark:text-white">
              Enable 2FA
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Extra security
            </p>
          </div>
          <button
            onClick={handleToggle2FA}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              is2FAEnabled ? "bg-neutral-700 dark:bg-neutral-400" : "bg-neutral-300 dark:bg-neutral-700"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                is2FAEnabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
       
        {is2FAEnabled && (
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <div>
              <p className="text-xs font-medium text-neutral-900 dark:text-white mb-1">
                Scan QR
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                With authenticator app
              </p>
             
              <div className="inline-block p-3 border border-neutral-300 dark:border-neutral-700 rounded-md">
                <div className="w-32 h-32 border border-neutral-200 dark:border-neutral-800 rounded flex items-center justify-center">
                  <div className="text-center">
                    <Shield size={24} className="mx-auto mb-1 text-neutral-400" />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">QR</span>
                  </div>
                </div>
              </div>
             
              <div className="mt-2 p-2 border border-neutral-200 dark:border-neutral-800 rounded-md">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-0.5">
                  Or manual:
                </p>
                <p className="text-xs font-mono font-medium text-neutral-900 dark:text-white">
                  ABCD EFGH IJKL MNOP
                </p>
              </div>
            </div>
           
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              2FA active
            </p>
          </div>
        )}
      </div>
    </SettingsCard>
  );
}