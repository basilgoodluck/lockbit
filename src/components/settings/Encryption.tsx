import { useState } from "react";
import toast from "react-hot-toast";
import { Lock, Clock } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

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
    console.log("Saving encryption settings:", { defaultTime, useDefaultPassword, defaultPassword });
    toast.success("Encryption settings saved!");
  };

  return (
    <SettingsCard
      title="Encryption Settings"
      description="Configure default settings for file encryption"
    >
      <div className="space-y-5">
        {/* Default Time */}
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
            <Clock size={16} className="text-blue-600 dark:text-blue-400" />
            Default Encryption Time
          </label>
          <select
            value={defaultTime}
            onChange={(e) => setDefaultTime(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Default Password */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <label className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-3">
            <Lock size={16} className="text-blue-600 dark:text-blue-400" />
            Default Encryption Password
          </label>
          
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setUseDefaultPassword(!useDefaultPassword)}
              className={`w-11 h-6 rounded-full transition-all ${useDefaultPassword ? "bg-blue-600" : "bg-neutral-200 dark:bg-neutral-700"}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-all ${useDefaultPassword ? "ml-6" : "ml-1"}`} />
            </button>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Use default password for all encryptions
            </span>
          </div>

          {useDefaultPassword && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                placeholder="Enter default password"
                className="w-full px-4 py-2.5 pr-16 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Save Settings
          </button>
        </div>
      </div>
    </SettingsCard>
  );
}
