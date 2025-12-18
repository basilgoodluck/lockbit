// Notification.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import { Upload, Lock, UserCheck } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    uploads: true,
    encryption: false,
    account: true,
  });
  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    console.log("Updating notifications:", { ...notifications, [key]: !notifications[key] });
    toast.success("Updated!");
  };
  const notificationTypes = [
    {
      key: "uploads",
      label: "File Uploads",
      icon: Upload,
      description: "When files are uploaded"
    },
    {
      key: "encryption",
      label: "Encryption Actions",
      icon: Lock,
      description: "For encryption/decryption"
    },
    {
      key: "account",
      label: "Account Activity",
      icon: UserCheck,
      description: "Logins and security"
    },
  ];
  return (
    <SettingsCard title="Notifications">
      <div className="space-y-2 divide-y divide-neutral-200 dark:divide-neutral-800">
        {notificationTypes.map(({ key, label, icon: Icon, description }) => (
          <div
            key={key}
            className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-2 flex-1">
              <Icon size={16} className="text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-neutral-900 dark:text-white">
                  {label}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {description}
                </p>
              </div>
            </div>
           
            <button
              onClick={() => handleToggle(key as keyof typeof notifications)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
                notifications[key as keyof typeof notifications]
                  ? "bg-neutral-700 dark:bg-neutral-400"
                  : "bg-neutral-300 dark:bg-neutral-700"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  notifications[key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}