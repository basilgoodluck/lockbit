import { useState } from "react";
import toast from "react-hot-toast";
import { Shield, Check } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

export function TwoFactorSettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleToggle2FA = () => {
    console.log("Toggling 2FA:", !is2FAEnabled);
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(`2FA ${is2FAEnabled ? "disabled" : "enabled"}!`);
  };

  return (
    <SettingsCard
      title="Two-Factor Authentication"
      description="Enhance your account security with 2FA"
    >
      <div className="space-y-4">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-blue-600 dark:text-blue-400" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              Enable Two-Factor Authentication
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Add an extra layer of security to your account
            </p>
          </div>

          <button
            onClick={handleToggle2FA}
            className={`w-11 h-6 rounded-full transition-all flex-shrink-0 ${
              is2FAEnabled ? "bg-blue-600" : "bg-neutral-200 dark:bg-neutral-700"
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-all ${
              is2FAEnabled ? "ml-6" : "ml-1"
            }`} />
          </button>
        </div>

        {/* QR Code Section */}
        {is2FAEnabled && (
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="text-center">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                Scan this QR code
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                Use your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              
              {/* Mock QR Code */}
              <div className="inline-block p-4 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl">
                <div className="w-40 h-40 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                      <Shield size={32} className="text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">QR Code</span>
                  </div>
                </div>
              </div>

              {/* Setup Code */}
              <div className="mt-4 p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                  Or enter this code manually:
                </p>
                <p className="text-sm font-mono font-semibold text-neutral-900 dark:text-white">
                  ABCD EFGH IJKL MNOP
                </p>
              </div>
            </div>

            {/* Success Message */}
            <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg">
              <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                2FA is now active on your account
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-top-4 {
          from { transform: translateY(-1rem); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out, slide-in-from-top-4 0.3s ease-out;
        }
      `}</style>
    </SettingsCard>
  );
}
