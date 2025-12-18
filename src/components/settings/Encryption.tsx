// Encryption.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import { SettingsCard } from "./SettingsCard";
export function EncryptionSettings() {
  const [defaultTime, setDefaultTime] = useState("7 days");
  const [useDefaultPassword, setUseDefaultPassword] = useState(false);
  const [defaultPassword, setDefaultPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const timeOptions = ["1 hour", "1 day", "7 days", "30 days", "Never"];
  const handleSave = () => {
    if (useDefaultPassword && !defaultPassword) {
      toast.error("Enter a default password.");
      return;
    }
    console.log("Saving encryption settings:", { defaultTime, useDefaultPassword, defaultPassword });
    toast.success("Saved!");
  };
  return (
    <SettingsCard title="Encryption">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Default Time
          </label>
          <select
            value={defaultTime}
            onChange={(e) => setDefaultTime(e.target.value)}
            className="w-full px-3 py-1.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-md text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 cursor-pointer"
          >
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
       
        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Default Password
            </label>
            <button
              onClick={() => setUseDefaultPassword(!useDefaultPassword)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                useDefaultPassword ? "bg-neutral-700 dark:bg-neutral-400" : "bg-neutral-300 dark:bg-neutral-700"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  useDefaultPassword ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        
          {useDefaultPassword && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                placeholder="Enter default password"
                className="w-full px-3 py-1.5 pr-12 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-md text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          )}
        </div>
       
        <button
          onClick={handleSave}
          className="px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Save
        </button>
      </div>
    </SettingsCard>
  );
}