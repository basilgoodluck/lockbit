// SettingsPage.tsx
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
    <div className="max-w-4xl">
      {/* <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage your account settings and preferences
        </p>
      </div> */}
      
      <div className="space-y-12">
        <PlanSettings />
        <StorageSettings />
        <PasswordSettings />
        <TwoFactorSettings />
        <EncryptionSettings />
        <NotificationSettings />
        <DeleteAccountSettings />
      </div>
    </div>
  );
}