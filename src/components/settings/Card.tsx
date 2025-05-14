import { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{title}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
      {children}
    </div>
  );
}