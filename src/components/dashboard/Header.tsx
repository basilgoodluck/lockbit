"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Lock, MessageSquare, ChevronRight } from "lucide-react";
import { ChatModal } from "@/components/dashboard/ChatModal";

export function Header() {
  const [query, setQuery] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'LockBit', path: '/dashboard' }];

    let currentPath = '';
    paths.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xl font-medium text-neutral-900 dark:text-white flex-shrink-0">
            <Lock size={20} className="text-blue-700 dark:text-blue-300" />
          </div>
          
          <nav className="hidden md:flex items-center gap-1 min-w-0 overflow-x-auto scrollbar-hide">
            {breadcrumbs.map((crumb, index) => (
              <div key={`${crumb.path}-${index}`} className="flex items-center gap-1 flex-shrink-0">
                {index > 0 && (
                  <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <nav className="md:hidden flex items-center gap-1 min-w-0 overflow-x-auto scrollbar-hide">
            {breadcrumbs.length > 1 && (
              <>
                <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                  {breadcrumbs[breadcrumbs.length - 1].name}
                </span>
              </>
            )}
          </nav>
        </div>

        <button
          className="md:hidden text-neutral-700 dark:text-white ml-2 flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/analytics"
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${pathname === "/analytics" ? "text-blue-700 dark:text-blue-300 underline underline-offset-2" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
          >
            Analytics
          </Link>
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
          >
            <MessageSquare size={14} className="text-blue-700 dark:text-blue-300" />
            Chat with LockBot
          </button>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-800 p-4 border-b border-neutral-200 dark:border-neutral-700">
          <form className="relative w-full mb-4">
            <input
              type="text"
              value={query}
              onChange={handleQuery}
              placeholder="Search files..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </form>
          <nav className="flex flex-col gap-2">
            <Link
              href="/analytics"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${pathname === "/analytics" ? "text-blue-700 dark:text-blue-300 underline underline-offset-2" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            <button
              onClick={() => {
                setIsChatOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all"
            >
              <MessageSquare size={14} className="text-blue-700 dark:text-blue-300" />
              Chat with LockBot
            </button>
          </nav>
        </div>
      )}

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}