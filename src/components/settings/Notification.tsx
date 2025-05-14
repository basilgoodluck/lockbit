import { useState } from "react";
import toast from "react-hot-toast";
import { Bell } from "lucide-react";
import { SettingsCard } from "./Card";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    uploads: true,
    encryption: false,
    account: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    // Mock API call
    console.log("Updating notifications:", { ...notifications, [key]: !notifications[key] });
    toast.success("Notification settings saved!");
  };

  return (
    <SettingsCard
      title="Notification Preferences"
      description="Manage your notification settings."
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notifications.uploads}
            onChange={() => handleToggle("uploads")}
            className="h-4 w-4 text-accent-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            File Uploads
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notifications.encryption}
            onChange={() => handleToggle("encryption")}
            className="h-4 w-4 text-accent-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Encryption Actions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notifications.account}
            onChange={() => handleToggle("account")}
            className="h-4 w-4 text-accent-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Account Activity
          </span>
        </div>
      </div>
    </SettingsCard>
  );
}