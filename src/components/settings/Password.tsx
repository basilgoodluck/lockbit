import { useState } from "react";
import toast from "react-hot-toast";
import { SettingsCard } from "./Card";

export function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    // Mock API call
    console.log("Updating password:", { currentPassword, newPassword });
    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <SettingsCard
      title="Change Password"
      description="Update your account password."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="
              w-full p-3 mt-1 rounded-lg bg-neutral-200 dark:bg-neutral-700
              text-neutral-900 dark:text-neutral-200 border border-neutral-300
              dark:border-neutral-600 focus:outline-none focus:ring-2
              focus:ring-accent-500
            "
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="
              w-full p-3 mt-1 rounded-lg bg-neutral-200 dark:bg-neutral-700
              text-neutral-900 dark:text-neutral-200 border border-neutral-300
              dark:border-neutral-600 focus:outline-none focus:ring-2
              focus:ring-accent-500
            "
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="
              w-full p-3 mt-1 rounded-lg bg-neutral-200 dark:bg-neutral-700
              text-neutral-900 dark:text-neutral-200 border border-neutral-300
              dark:border-neutral-600 focus:outline-none focus:ring-2
              focus:ring-accent-500
            "
          />
        </div>
        <button
          type="submit"
          className="
            px-4 py-2 rounded-lg text-sm font-semibold
            bg-accent-500 text-white hover:bg-accent-600
            transition-colors
          "
        >
          Update Password
        </button>
      </form>
    </SettingsCard>
  );
}