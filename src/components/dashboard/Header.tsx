"use client";

import { User, LogOut, Plus, Lock, MessageSquare, Menu, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChatModal } from "@/components/dashboard/ChatModal";

export function Header() {
  const [query, setQuery] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleQuery = (query: ChangeEvent<HTMLInputElement>) => {
    setQuery(query.target.value);
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-amber-200 h-16">
        {/* Logo */}
        <h1 className="text-2xl font-semibold text-black flex items-center gap-2">
          <Lock className="w-6 h-6" />
          LockBit
        </h1>

        <button
          className="md:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex flex-1 justify-center">
          <form className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={handleQuery}
              placeholder="Search files..."
              className="
                w-full py-2 pl-10 pr-4 rounded-full bg-neutral-200 dark:bg-neutral-800
                text-neutral-50 placeholder-neutral-50
                focus:outline-none 
                transition-all
              "
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-50"
              width="20"
              height="20"
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

        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/analytics"
            className={`
              px-3 py-2 rounded-full text-sm font-semibold text-black
              transition-colors
              ${
                pathname === "/analytics"
                  ? "bg-accent-600"
                  : "bg-accent-500 hover:bg-accent-600"
              }
            `}
          >
            Analytics
          </Link>
          <button
            onClick={() => setIsChatOpen(true)}
            className="
              flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-black
              bg-accent-500 hover:bg-accent-600 transition-colors
            "
          >
            <MessageSquare className="w-4 h-4" />
            Chat with LockBot
          </button>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-50 dark:bg-amber-200 p-4">
          <form className="relative w-full mb-4">
            <input
              type="text"
              value={query}
              onChange={handleQuery}
              placeholder="Search files..."
              className="
                w-full py-2 pl-10 pr-4 rounded-full bg-neutral-200 dark:bg-neutral-800
                text-neutral-50 placeholder-neutral-50
                focus:outline-none 
                transition-all
              "
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-50"
              width="20"
              height="20"
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
                px-3 py-2 rounded-full text-sm font-semibold text-black
                transition-colors
                ${
                  pathname === "/analytics"
                    ? "bg-accent-600"
                    : "bg-accent-500 hover:bg-accent-600"
                }
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
                flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-black
                bg-accent-500 hover:bg-accent-600 transition-colors
              "
            >
              <MessageSquare className="w-4 h-4" />
              Chat with LockBot
            </button>
          </nav>
        </div>
      )}

      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}