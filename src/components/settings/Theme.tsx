import { useState } from "react";
import toast from "react-hot-toast";
import { Moon, Sun, Monitor } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

export function ThemeSettings() {
  const [theme, setTheme] = useState("system");

  const handleChange = (newTheme: string) => {
    setTheme(newTheme);
    console.log("Setting theme:", newTheme);
    toast.success(`Theme set to ${newTheme}!`);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  };

  const themes = [
    { value: "light", label: "Light", icon: Sun, description: "Light mode" },
    { value: "dark", label: "Dark", icon: Moon, description: "Dark mode" },
    { value: "system", label: "System", icon: Monitor, description: "Follow system preference" },
  ];

  return (
    <SettingsCard
      title="Theme Preference"
      description="Choose your preferred theme for the application"
    >
      <div className="space-y-2">
        {themes.map(({ value, label, icon: Icon, description }) => (
          <button
            key={value}
            onClick={() => handleChange(value)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
              theme === value
                ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              theme === value ? "border-blue-600 bg-blue-600" : "border-neutral-300 dark:border-neutral-600"
            }`}>
              {theme === value && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              theme === value ? "bg-blue-100 dark:bg-blue-900/30" : "bg-neutral-100 dark:bg-neutral-800"
            }`}>
              <Icon size={20} className={theme === value ? "text-blue-600 dark:text-blue-400" : "text-neutral-600 dark:text-neutral-400"} />
            </div>

            <div className="flex-1 text-left">
              <p className={`text-sm font-semibold ${
                theme === value ? "text-neutral-900 dark:text-white" : "text-neutral-700 dark:text-neutral-300"
              }`}>
                {label}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </SettingsCard>
  );
}
