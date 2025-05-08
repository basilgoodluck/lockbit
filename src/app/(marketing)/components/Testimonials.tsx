"use client";

import { FaStar } from "react-icons/fa";

export function Testimonials() {
  const testimonials = [
    {
      name: "Alex Turner",
      role: "Freelancer",
      quote: "This tool is a game-changer! I can encrypt my client files in seconds, and the interface is so easy to use.",
    },
    {
      name: "Sarah Lee",
      role: "Small Business Owner",
      quote: "Data Encryption gives me peace of mind. My sensitive documents are now secure, and I love the simplicity.",
    },
    {
      name: "Michael Brown",
      role: "IT Manager",
      quote: "The encryption is robust, and the team’s support is fantastic. Highly recommend for any organization.",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-neutral-50">
          What Users Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm shadow-neutral-500 space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-2xl text-accent-500" />
                ))}
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-50">
                  {testimonial.name}
                </p>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}