"use client";

import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { OurGoal } from "../components/OurGoal";
import { Team } from "../components/Team";
import { Testimonials } from "../components/Testimonials";
import { Pricing } from "../components/Pricing";
import { CallToAction } from "../components/CTA";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 flex flex-col">
      <main className="flex-grow pt-20">
        <Hero />
        <Features />
        <OurGoal />
        <Team />
        <Testimonials />
        <Pricing />
        <CallToAction />
      </main>
    </div>
  );
}