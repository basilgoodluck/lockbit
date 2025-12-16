import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

export function EmailSettings() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    
    console.log("Updating email:", { email, currentPassword });
    toast.success("Email updated successfully!");
    setEmail("");
    setCurrentPassword("");
  };

  return (
    <SettingsCard
      title="Change Email"
      description="Update your account email address"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New Email */}
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
            <Mail size={14} className="text-blue-600 dark:text-blue-400" />
            New Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email address"
            className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Current Password */}
        <div>
          <label className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
            <Lock size={14} className="text-blue-600 dark:text-blue-400" />
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-4 py-2.5 pr-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-all"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Required to verify this change
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Update Email
          </button>
        </div>
      </form>
    </SettingsCard>
  );
}
