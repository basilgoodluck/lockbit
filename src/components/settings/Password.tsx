// Password.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
export function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
   
    console.log("Updating password:", { currentPassword, newPassword });
    toast.success("Password updated successfully!");
   
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { label: "", color: "", width: "0%" };
    if (password.length < 6) return { label: "Weak", color: "bg-neutral-400", width: "33%" };
    if (password.length < 10) return { label: "Medium", color: "bg-neutral-500", width: "66%" };
    return { label: "Strong", color: "bg-neutral-700 dark:bg-neutral-400", width: "100%" };
  };
  const strength = getPasswordStrength(newPassword);
  return (
    <SettingsCard title="Change Password">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Current
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-3 py-1.5 pr-10 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-md text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            New
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-1.5 pr-10 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-md text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
         
          {newPassword && (
            <div className="mt-1">
              <div className="flex justify-between mb-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                <span>Strength</span>
                <span className="font-medium">{strength.label}</span>
              </div>
              <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Confirm
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-1.5 pr-10 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-md text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
         
          {confirmPassword && (
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              {newPassword === confirmPassword ? "✓ Match" : "✗ No match"}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Update
        </button>
      </form>
    </SettingsCard>
  );
}