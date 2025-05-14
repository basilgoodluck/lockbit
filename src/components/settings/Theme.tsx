import { useState } from "react";
import toast from "react-hot-toast";
import { Moon, Sun } from "lucide-react";
import { SettingsCard } from "./Card";

export function ThemeSettings() {
  const [theme, setTheme] = useState("system");

  const handleChange = (newTheme: string) => {
    setTheme(newTheme);
    // Mock API call or apply theme
    console.log("Setting theme:", newTheme);
    toast.success(`Theme set to ${newTheme}!`);
    // Example: Apply theme (requires Tailwind darkMode: 'class')
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <SettingsCard
      title="Theme Preference"
      description="Choose your preferred theme."
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="theme"
            checked={theme === "light"}
            onChange={() => handleChange("light")}
            className="h-4 w-4 text-accent-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
            <Sun size={16} />
            Light
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="theme"
            checked={theme === "dark"}
            onChange={() => handleChange("dark")}
            className="h-4 w-4 text-accent-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
            <Moon size={16} />
            Dark
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="theme"
            checked={theme === "system"}
            onChange={() => handleChange("system")}
            className="h-4 w-4 text-accent-500"
          />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            System
          </span>
        </div>
      </div>
    </SettingsCard>
  );
}