import { useState } from "react";
import toast from "react-hot-toast";
import { Bell, Upload, Lock, UserCheck } from "lucide-react";
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
    toast.success("Notification settings updated!");
  };

  const notificationTypes = [
    { 
      key: "uploads", 
      label: "File Uploads", 
      icon: Upload,
      description: "Get notified when files are uploaded"
    },
    { 
      key: "encryption", 
      label: "Encryption Actions", 
      icon: Lock,
      description: "Alerts for encryption and decryption"
    },
    { 
      key: "account", 
      label: "Account Activity", 
      icon: UserCheck,
      description: "Login attempts and security alerts"
    },
  ];

  return (
    <SettingsCard
      title="Notification Preferences"
      description="Manage your notification settings"
    >
      <div className="space-y-3">
        {notificationTypes.map(({ key, label, icon: Icon, description }) => (
          <div 
            key={key} 
            className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all"
          >
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-blue-600 dark:text-blue-400" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                {label}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            </div>

            <button
              onClick={() => handleToggle(key as keyof typeof notifications)}
              className={`w-11 h-6 rounded-full transition-all flex-shrink-0 ${
                notifications[key as keyof typeof notifications] 
                  ? "bg-blue-600" 
                  : "bg-neutral-200 dark:bg-neutral-700"
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                notifications[key as keyof typeof notifications] ? "ml-6" : "ml-1"
              }`} />
            </button>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}
