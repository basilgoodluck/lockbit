"use client";

import { FaLock, FaFileUpload, FaShieldAlt } from "react-icons/fa";

export function Features() {
  const features = [
    {
      icon: <FaLock className="text-4xl text-accent-500 mx-auto" />,
      title: "Advanced Encryption",
      description: "Leverage military-grade algorithms to secure your data against any threat.",
    },
    {
      icon: <FaFileUpload className="text-4xl text-accent-500 mx-auto" />,
      title: "Seamless File Upload",
      description: "Upload multiple files and encrypt them in one go with ease.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-accent-500 mx-auto" />,
      title: "User-Friendly Design",
      description: "An intuitive interface that makes encryption accessible to everyone.",
    },
  ];

  return (
    <section id="features" className="py-12 md:py-20 px-4 bg-neutral-100 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-neutral-50">
          Why Data Encryption?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm shadow-neutral-500 text-center space-y-4 hover:shadow-lg transition-shadow"
            >
              {feature.icon}
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {feature.title}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}