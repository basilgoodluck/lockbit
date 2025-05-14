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
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-amber-200 mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Settings
        </h1>
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