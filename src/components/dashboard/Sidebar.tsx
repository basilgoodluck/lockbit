"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home, Settings, Lock, User, Folder, ChevronDown, X } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  
  const toggleFilesDropdown = () => setIsFilesOpen((prev) => !prev);

  const closeSidebar = () => setIsOpen(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Encryption", href: "/encryption", icon: Lock },
    { name: "Files", icon: Folder, isDropdown: true },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const resourceTypes = [
    { name: "Videos", href: "/files/videos" },
    { name: "Images", href: "/files/images" },
    { name: "Documents", href: "/files/documents" },
    { name: "Audios", href: "/files/audios" },
    { name: "Others", href: "/files/others" },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
        onClick={toggleSidebar}
      >
        <Menu size={20} className="text-blue-600 dark:text-blue-400" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
          flex flex-col border-r border-neutral-200 dark:border-neutral-700 rounded-r-3xl
          h-full
        `}
      >
        <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Menu</h2>
          <button
            className="md:hidden p-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
            onClick={closeSidebar}
          >
            <X size={16} className="text-blue-600 dark:text-blue-400" />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.isDropdown ? (
                <>
                  <button
                    onClick={toggleFilesDropdown}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg w-full text-sm
                      text-neutral-700 dark:text-white
                      hover:bg-neutral-100 dark:hover:bg-neutral-700
                      transition-all group
                      ${isFilesOpen ? "bg-neutral-100 dark:bg-neutral-700" : ""}
                    `}
                  >
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-md group-hover:bg-neutral-200 dark:group-hover:bg-neutral-600 transition-colors">
                      <item.icon size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform text-blue-600 dark:text-blue-400 ${isFilesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  
                  {isFilesOpen && (
                    <div className="pl-10 mt-1 space-y-1">
                      {resourceTypes.map((resource) => (
                        <Link
                          key={resource.name}
                          href={resource.href}
                          className={`
                            block p-2 rounded-lg text-sm
                            text-neutral-600 dark:text-neutral-300
                            hover:bg-neutral-100 dark:hover:bg-neutral-700
                            transition-all
                            ${pathname === resource.href ? "bg-neutral-100 dark:bg-neutral-700 font-medium" : ""}
                          `}
                          onClick={closeSidebar}
                        >
                          {resource.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href!}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg text-sm
                    text-neutral-700 dark:text-white
                    hover:bg-neutral-100 dark:hover:bg-neutral-700
                    transition-all group
                    ${pathname === item.href ? "bg-neutral-100 dark:bg-neutral-700 font-medium" : ""}
                  `}
                  onClick={closeSidebar}
                >
                  <div className="p-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-md group-hover:bg-neutral-200 dark:group-hover:bg-neutral-600 transition-colors">
                    <item.icon size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-neutral-900 dark:text-white font-medium text-sm truncate">User Name</p>
              <Link
                href="/settings"
                className="
                  flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-300
                  hover:text-blue-600 dark:hover:text-blue-400 transition-colors
                "
                onClick={closeSidebar}
              >
                <Settings size={12} className="text-blue-600 dark:text-blue-400" />
                Settings
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}