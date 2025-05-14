import { useState } from "react";
import toast from "react-hot-toast";
import { Shield } from "lucide-react";
import { SettingsCard } from "./Card";

export function TwoFactorSettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleToggle2FA = () => {
    // Mock API call
    console.log("Toggling 2FA:", !is2FAEnabled);
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(`2FA ${is2FAEnabled ? "disabled" : "enabled"}!`);
  };

  return (
    <SettingsCard
      title="Two-Factor Authentication"
      description="Enhance your account security with 2FA."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={is2FAEnabled}
            onChange={handleToggle2FA}
            className="h-4 w-4 text-accent-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Enable Two-Factor Authentication
          </span>
        </div>
        {is2FAEnabled && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Scan this QR code with your authenticator app (mock setup).
          </p>
        )}
      </div>
    </SettingsCard>
  );
}