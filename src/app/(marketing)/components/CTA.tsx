"use client";

import Link from "next/link";

export function CallToAction() {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h3
          className="
            crazy-3d-title
            text-2xl
            md:text-3xl
            font-bold
            text-neutral-900
            dark:text-neutral-50
          "
        >
          Ready to Secure Your Data?
        </h3>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
          Join thousands of users who trust Data Encryption to protect their sensitive information. Start today!
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
          Get Started
        </Link>
      </div>
    </section>
  );
}