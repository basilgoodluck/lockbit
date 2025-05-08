"use client";

import { FaRocket } from "react-icons/fa";

export function OurGoal() {
  return (
    <section className="py-12 md:py-20 px-4">
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
          Our Goal
        </h3>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
          At Data Encryption, our mission is to empower individuals and businesses to protect their sensitive information with confidence. We aim to make encryption simple, accessible, and reliable, ensuring your data stays private in an increasingly connected world.
        </p>
        <div className="flex justify-center">
          <FaRocket className="text-5xl text-accent-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}