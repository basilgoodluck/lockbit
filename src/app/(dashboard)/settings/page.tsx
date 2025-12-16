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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            Settings
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 ml-[52px]">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlanSettings />
          <EmailSettings />
          <PasswordSettings />
          <ProfilePhotoSettings />
          <EncryptionSettings />
          <StorageSettings />
          <TwoFactorSettings />
          <NotificationSettings />
          <ThemeSettings />
          <DeleteAccountSettings />
        </div>
      </div>
    </div>
  );
}
