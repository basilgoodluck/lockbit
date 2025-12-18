// SettingsCard.tsx
import { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <div className="pb-8 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
          {title}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
      <div className="max-w-2xl">
        {children}
      </div>
    </div>
  );
}