"use client";

import { Settings } from "lucide-react";
import { PlanSettings } from "@/components/settings/Plans";
import { EmailSettings } from "@/components/settings/Email";
import { PasswordSettings } from "@/components/settings/Password";
import { ProfilePhotoSettings } from "@/components/settings/ProfilePhoto";
import { EncryptionSettings } from "@/components/settings/Encryption";
import { StorageSettings } from "@/components/settings/Storage";
import { TwoFactorSettings } from "@/components/settings/2FA";
import { NotificationSettings } from "@/components/settings/Notification";
import { ThemeSettings } from "@/components/settings/Theme";
import { DeleteAccountSettings } from "@/components/settings/Delete";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
          <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <Settings size={24} className="text-neutral-600 dark:text-neutral-400" />
          </div>
          Settings
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        <PlanSettings />
        <StorageSettings />
        <EmailSettings />
        <PasswordSettings />
        <ProfilePhotoSettings />
        <TwoFactorSettings />
        <EncryptionSettings />
        <NotificationSettings />
        <ThemeSettings />
        <DeleteAccountSettings />
      </div>
    </div>
  );
}