"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Lock, MessageSquare } from "lucide-react";
import { ChatModal } from "@/components/dashboard/ChatModal";

export function Header() {
  const [query, setQuery] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 h-16 border-b border-neutral-200 dark:border-neutral-700">
        <h1 className="text-xl font-medium text-neutral-900 dark:text-white flex items-center gap-2">
          <Lock size={20} className="text-blue-600 dark:text-blue-400" />
          LockBit
        </h1>

        <button
          className="md:hidden text-neutral-700 dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden md:flex flex-1 justify-center">
          <form className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={handleQuery}
              placeholder="Search files..."
              className="
                w-full py-2 pl-10 pr-4 rounded-full bg-neutral-100 dark:bg-neutral-700
                text-neutral-700 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400
                border border-neutral-300 dark:border-neutral-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all
              "
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
        </div>

        <nav className="hidden md:flex items-center gap-3">
          <Link
            href="/analytics"
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-white
              bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600
              transition-all
              ${pathname === "/analytics" ? "bg-neutral-200 dark:bg-neutral-600" : ""}
            `}
          >
            Analytics
          </Link>
          <button
            onClick={() => setIsChatOpen(true)}
            className="
              flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-white
              bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600
              transition-all
            "
          >
            <MessageSquare size={14} className="text-blue-600 dark:text-blue-400" />
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
              className="
                w-full py-2 pl-10 pr-4 rounded-full bg-neutral-100 dark:bg-neutral-700
                text-neutral-700 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400
                border border-neutral-300 dark:border-neutral-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all
              "
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
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-white
                bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600
                transition-all
                ${pathname === "/analytics" ? "bg-neutral-200 dark:bg-neutral-600" : ""}
              `}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            <button
              onClick={() => {
                setIsChatOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="
                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 dark:text-white
                bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600
                transition-all
              "
            >
              <MessageSquare size={14} className="text-blue-600 dark:text-blue-400" />
              Chat with LockBot
            </button>
          </nav>
        </div>
      )}

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}