"use client";

import { X, Send } from "lucide-react";
import { useState } from "react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle message sending (e.g., API call)
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-amber-200">
          Chat with LockBot
        </h2>
        <button onClick={onClose} className="text-neutral-600 dark:text-neutral-300">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="h-64 overflow-y-auto mb-4 p-2 bg-neutral-200 dark:bg-neutral-700 rounded">
        {/* Placeholder for chat messages */}
        <p className="text-neutral-600 dark:text-neutral-300">
          Welcome to LockBot! How can I assist you?
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="
            flex-1 p-2 rounded bg-neutral-200 dark:bg-neutral-800
            text-neutral-900 dark:text-neutral-300
            focus:outline-none
          "
        />
        <button
          type="submit"
          className="
            p-2 bg-amber-500 text-neutral-900 rounded
            hover:bg-amber-600 transition-colors
          "
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}