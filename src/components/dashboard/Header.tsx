"use client";

import { User, LogOut, Plus, Lock } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-amber-200 h-16">
      <h1 className="text-2xl font-semibold text-black">
        LockBit
      </h1>
      <div className="flex items-center gap-4 flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
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
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="
            flex items-center gap-2 px-3 py-2 rounded-full bg-accent-500 text-black
            hover:bg-accent-600 transition-colors text-sm font-semibold
          "
        >
          <Plus size={16} />
          Add File
        </button>
        <button
          className="
            flex items-center gap-2 px-3 py-2 rounded-full bg-accent-500 text-black
            hover:bg-accent-600 transition-colors text-sm font-semibold
          "
        >
          <Lock size={16} />
          Bits 9
        </button>
        <div className="flex items-center gap-2">
          <User className="text-black" size={20} />
          <span className="text-black">User</span>
        </div>
        <button
          className="
            p-2 rounded-full bg-accent-500 text-black
            hover:bg-accent-600 transition-colors
          "
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}