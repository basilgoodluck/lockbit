import { useState } from "react";
import toast from "react-hot-toast";
import { SettingsCard } from "./Card";

export function EmailSettings() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    // Mock API call
    console.log("Updating email:", { email, currentPassword });
    toast.success("Email updated successfully!");
    setEmail("");
    setCurrentPassword("");
  };

  return (
    <SettingsCard
      title="Change Email"
      description="Update your account email address."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            New Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
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
        <button
          type="submit"
          className="
            px-4 py-2 rounded-lg text-sm font-semibold
            bg-accent-500 text-white hover:bg-accent-600
            transition-colors
          "
        >
          Update Email
        </button>
      </form>
    </SettingsCard>
  );
}