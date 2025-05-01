"use client";

import { FaUsers } from "react-icons/fa";

export function Team() {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "Founder & CEO",
      bio: "Jane is passionate about data security and has over 15 years of experience in cybersecurity.",
    },
    {
      name: "John Smith",
      role: "Lead Developer",
      bio: "John crafts seamless user experiences and robust encryption solutions.",
    },
    {
      name: "Emily Chen",
      role: "UI/UX Designer",
      bio: "Emily designs intuitive interfaces that make encryption accessible to all.",
    },
  ];

  return (
    <section id="team" className="py-12 md:py-20 px-4 bg-neutral-100 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 dark:text-neutral-50">
          Meet Our Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm shadow-neutral-500 text-center space-y-4 hover:shadow-lg transition-shadow"
            >
              <FaUsers className="text-4xl text-accent-500 mx-auto" />
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {member.name}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 font-medium">
                {member.role}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}