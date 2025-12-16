"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          <div className="h-4 w-48 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-900"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="flex flex-col h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {isLoading ? <LoadingSkeleton /> : children}
        </main>
      </div>
    </div>
  );
}