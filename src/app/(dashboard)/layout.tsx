"use client"
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen dark:bg-neutral-900">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <div className="py-8 pl-8 bg-transparent h-full">
          <Sidebar />
        </div>
        <div
          className="w-full overflow-y-auto p-3"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>
          {children}
        </div>
      </div>
    </div>
  );
}