import { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-5 transition-all hover:shadow-md">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}
