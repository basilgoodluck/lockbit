// SettingsPage.tsx
"use client";

import { PlanSettings } from "@/components/settings/Plans";
import { PasswordSettings } from "@/components/settings/Password";
import { EncryptionSettings } from "@/components/settings/Encryption";
import { StorageSettings } from "@/components/settings/Storage";
import { TwoFactorSettings } from "@/components/settings/2FA";
import { NotificationSettings } from "@/components/settings/Notification";
import { DeleteAccountSettings } from "@/components/settings/Delete";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl">
      
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