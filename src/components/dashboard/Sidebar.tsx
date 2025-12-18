"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home, Settings, Lock, User, Folder, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFilesOpen, setIsFilesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/files")) {
      setIsFilesOpen(true);
    }
  }, [pathname]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
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

  const isActiveRoute = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  const isFilesRouteActive = () => {
    return pathname?.startsWith("/files");
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition-colors shadow-sm"
        onClick={toggleSidebar}
      >
        <Menu size={20} className="text-blue-600 dark:text-blue-400" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-800
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
          flex flex-col border-r border-neutral-200 dark:border-neutral-700
          h-full
          ${isCollapsed ? "md:w-20" : "w-64"}
        `}
      >
        <button
          className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 p-1.5 bg-white dark:bg-neutral-800 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition-colors shadow-md z-10"
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight size={16} className="text-blue-600 dark:text-blue-400" />
          ) : (
            <ChevronLeft size={16} className="text-blue-600 dark:text-blue-400" />
          )}
        </button>

        <div className="flex justify-end items-center p-4 border-b border-neutral-200 dark:border-neutral-700 md:hidden">
          <button
            className="p-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
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
                      transition-all group
                      ${isFilesRouteActive() || isFilesOpen
                        ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                      }
                    `}
                  >
                    <div className={`p-1.5 rounded-md transition-colors ${
                      isFilesRouteActive() || isFilesOpen
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-neutral-100 dark:bg-neutral-700 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-600"
                    }`}>
                      <item.icon size={16} className={
                        isFilesRouteActive() || isFilesOpen
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-neutral-600 dark:text-neutral-400"
                      } />
                    </div>
                    {!isCollapsed && <span className="flex-1 text-left">{item.name}</span>}
                    {!isCollapsed && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isFilesOpen ? "rotate-180" : ""} ${
                          isFilesRouteActive() || isFilesOpen
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-neutral-400"
                        }`}
                      />
                    )}
                  </button>
                  
                  {isFilesOpen && !isCollapsed && (
                    <div className="pl-10 mt-1 space-y-1">
                      {resourceTypes.map((resource) => (
                        <Link
                          key={resource.name}
                          href={resource.href}
                          className={`
                            block p-2 rounded-lg text-sm transition-all
                            ${isActiveRoute(resource.href)
                              ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium"
                              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                            }
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
                    flex items-center gap-3 p-3 rounded-lg text-sm transition-all group
                    ${isActiveRoute(item.href)
                      ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                    }
                  `}
                  onClick={closeSidebar}
                >
                  <div className={`p-1.5 rounded-md transition-colors ${
                    isActiveRoute(item.href)
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "bg-neutral-100 dark:bg-neutral-700 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-600"
                  }`}>
                    <item.icon size={16} className={
                      isActiveRoute(item.href)
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-neutral-600 dark:text-neutral-400"
                    } />
                  </div>
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 flex items-center justify-center flex-shrink-0 border border-neutral-200 dark:border-neutral-700">
              <User size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-neutral-900 dark:text-white font-medium text-sm truncate">User Name</p>
                <Link
                  href="/settings"
                  className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={closeSidebar}
                >
                  <Settings size={12} />
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}