"use client";

import { FaDollarSign } from "react-icons/fa";
import Link from "next/link";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Basic Encryption",
        "Up to 5 Files per Month",
        "Text Encryption",
        "Community Support",
      ],
    },
    {
      name: "Pro",
      price: "$9.99",
      features: [
        "Advanced Encryption",
        "Unlimited Files",
        "Text & File Encryption",
        "Priority Support",
        "Custom Passwords",
      ],
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      features: [
        "Military-Grade Encryption",
        "Unlimited Files & Users",
        "Dedicated Support",
        "API Access",
        "Custom Integrations",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-12 md:py-20 px-4 bg-neutral-100 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-neutral-50">
          Pricing Plans
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="
                bg-white
                dark:bg-neutral-700
                p-6
                rounded-lg
                shadow-sm
                shadow-neutral-500
                text-center
                space-y-4
                relative
                hover:shadow-lg
                transition-shadow
              "
            >
              {index === 1 && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent-500 text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              )}
              <FaDollarSign className="text-4xl text-accent-500 mx-auto" />
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {plan.name}
              </h4>
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                {plan.price}
                {plan.price !== "Contact Us" && (
                  <span className="text-base font-normal">/month</span>
                )}
              </p>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Link
                href="/"
                className="
                  inline-block
                  px-6
                  py-3
                  text-sm
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
                {plan.price === "Contact Us" ? "Contact Sales" : "Choose Plan"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}