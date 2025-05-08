"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Settings, Lock, User, Folder, ChevronDown } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleFilesDropdown = () => setIsFilesOpen(!isFilesOpen);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Encryption", href: "/dashboard/encryption", icon: Lock },
    { name: "Files", href: "/dashboard/files", icon: Folder, isDropdown: true },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const resourceTypes = [
    { name: "Videos", href: "/dashboard/files/videos" },
    { name: "Images", href: "/dashboard/files/images" },
    { name: "Documents", href: "/dashboard/files/documents" },
  ];

  return (
    <div className="rounded-2xl h-full overflow-hidden">
      <button
        className="md:hidden p-6 text-neutral-600 dark:text-neutral-300"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-neutral-100 dark:bg-neutral-800
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 transition-transform duration-300
          h-full flex flex-col
        `}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 p-2 rounded-lg flex-1
                    text-neutral-600 dark:text-neutral-300
                    hover:bg-accent-500 hover:text-white
                    transition-colors
                    ${pathname === item.href ? "bg-neutral-700 text-white" : ""}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
                {item.isDropdown && (
                  <button
                    onClick={toggleFilesDropdown}
                    className="
                      p-2 text-neutral-600 dark:text-neutral-300
                      hover:text-accent-500 transition-colors
                    "
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${isFilesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
              {item.isDropdown && isFilesOpen && (
                <div className="pl-6 mt-1 space-y-1">
                  {resourceTypes.map((resource) => (
                    <Link
                      key={resource.name}
                      href={resource.href}
                      className={`
                        flex items-center gap-3 p-2 rounded-lg text-sm
                        text-neutral-600 dark:text-neutral-300
                        hover:bg-accent-500 hover:text-white
                        transition-colors
                        ${pathname === resource.href ? "bg-neutral-700 text-white" : ""}
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{resource.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t dark:bg-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
              <User size={24} className="text-black dark:text-neutral-300" />
            </div>
            <div>
              <p className="text-neutral-900 dark:text-black font-semibold">User Name</p>
              <button
                className="
                  flex items-center gap-2 text-sm text-neutral-600 dark:text-black
                  hover:text-accent-500 transition-colors
                "
              >
                <Settings size={16} />
                Settings
              </button>
            </div>
          </div>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}