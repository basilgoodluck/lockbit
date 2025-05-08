"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2
          className="
            crazy-3d-title
            font-extrabold
            text-3xl
            md:text-5xl
            tracking-tight
            text-neutral-900
            dark:text-neutral-50
            select-none
          "
        >
          Secure Your Data, Simplify Your Life
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
          Encrypt files and text with cutting-edge technology. Protect what matters most with our intuitive, powerful tool.
        </p>
        <Link
          href="/"
          className="
            inline-block
            px-6
            py-3
            text-sm
            md:text-base
            font-semibold
            rounded-full
            bg-accent-500
            text-white
            border
            border-accent-500
            hover:bg-accent-600
            focus:outline-none
            focus:ring-2
            focus:ring-accent-500
          "
        >
          Start Encrypting Now
        </Link>
      </div>
    </section>
  );
}