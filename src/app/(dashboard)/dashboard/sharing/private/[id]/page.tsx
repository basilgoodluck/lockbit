"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function SharingPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidLink, setIsValidLink] = useState(true);
  const router = useRouter();
  const params = useParams();
  const resourceId = params.resourceId as string;

  useEffect(() => {
    const verifyLink = async () => {
      try {
        const response = await fetch(`/api/sharing/${resourceId}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Invalid or expired link");
        }
        setIsValidLink(true);
      } catch (error) {
        setIsValidLink(false);
        toast.error("Invalid or expired link");
      }
    };
    verifyLink();
  }, [resourceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/sharing/${resourceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Invalid password");
      }

      toast.success("Access granted!");
      router.push(`/dashboard/sharing/${resourceId}`);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-20 px-4">
        {isValidLink ? (
          <div className="max-w-md w-full bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm shadow-neutral-500 space-y-6">
            <h1
              className="
                crazy-3d-title
                text-center
                font-extrabold
                text-2xl
                md:text-3xl
                tracking-tight
                text-neutral-900
                dark:text-neutral-50
                select-none
              "
            >
              Access Shared Resource
            </h1>
            <p className="text-center text-neutral-600 dark:text-neutral-300">
              Enter the password to access the encrypted resource.
            </p>
            <div className="flex bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 rounded-r-4xl overflow-hidden p-1 relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="
                  p-2
                  rounded-l-md
                  bg-neutral-100
                  dark:bg-neutral-700
                  text-neutral-900
                  dark:text-neutral-200
                  outline-none
                  flex-1
                "
                style={{
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  backgroundColor: "transparent",
                  WebkitTextFillColor: "inherit",
                  border: "inherit",
                  transition: "background-color 9999s ease-in-out 0s",
                }}
                disabled={isLoading}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !password}
                className="
                  cursor-pointer
                  p-3
                  absolute
                  right-1
                  text-sm
                  rounded-full
                  bg-accent-500
                  text-white
                  border
                  border-l-0
                  border-neutral-300
                  dark:border-neutral-600
                  hover:bg-accent-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-accent-500
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {isLoading ? "Verifying..." : "Unlock"}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md w-full bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm shadow-neutral-500 space-y-6">
            <h1
              className="
                crazy-3d-title
                text-center
                font-extrabold
                text-2xl
                md:text-3xl
                tracking-tight
                text-neutral-900
                dark:text-neutral-50
                select-none
              "
            >
              Invalid Link
            </h1>
            <p className="text-center text-neutral-600 dark:text-neutral-300">
              The shared link is invalid or has expired. Please request a new link.
            </p>
          </div>
        )}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}