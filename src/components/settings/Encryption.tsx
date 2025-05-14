import { useState } from "react";
import toast from "react-hot-toast";
import { Lock, Clock } from "lucide-react";
import { SettingsCard } from "./Card";

export function EncryptionSettings() {
  const [defaultTime, setDefaultTime] = useState("7 days");
  const [useDefaultPassword, setUseDefaultPassword] = useState(false);
  const [defaultPassword, setDefaultPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const timeOptions = ["1 hour", "1 day", "7 days", "30 days", "Never"];

  const handleSave = () => {
    if (useDefaultPassword && !defaultPassword) {
      toast.error("Please enter a default password.");
      return;
    }
    // Mock API call
    console.log("Saving encryption settings:", { defaultTime, useDefaultPassword, defaultPassword });
    toast.success("Encryption settings saved!");
  };

  return (
    <SettingsCard
      title="Encryption Settings"
      description="Configure default settings for file encryption."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
            <Clock size={16} />
            Default Encryption Time
          </label>
          <select
            value={defaultTime}
            onChange={(e) => setDefaultTime(e.target.value)}
            className="
              w-full p-3 mt-1 rounded-lg bg-neutral-200 dark:bg-neutral-700
              text-neutral-900 dark:text-neutral-200 border border-neutral-300
              dark:border-neutral-600 focus:outline-none focus:ring-2
              focus:ring-accent-500
            "
          >
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
            <Lock size={16} />
            Default Encryption Password
          </label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={useDefaultPassword}
              onChange={(e) => setUseDefaultPassword(e.target.checked)}
              className="h-4 w-4 text-accent-500"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Use default password
            </span>
          </div>
          {useDefaultPassword && (
            <div className="mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                placeholder="Enter default password"
                className="
                  w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-700
                  text-neutral-900 dark:text-neutral-200 border border-neutral-300
                  dark:border-neutral-600 focus:outline-none focus:ring-2
                  focus:ring-accent-500
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-neutral-600 dark:text-neutral-300
                "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleSave}
          className="
            px-4 py-2 rounded-lg text-sm font-semibold
            bg-accent-500 text-white hover:bg-accent-600
            transition-colors
          "
        >
          Save Encryption Settings
        </button>
      </div>
    </SettingsCard>
  );
}