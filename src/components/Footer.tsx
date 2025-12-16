'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-primary-50 dark:bg-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              SecureVault
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              SecureVault provides end-to-end encrypted cloud storage and file sharing for individuals and businesses. Safely store, sync, and share your files with zero-knowledge encryption, ensuring only you and your chosen recipients can access your data.
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Trusted by thousands for secure collaboration, compliant with GDPR, HIPAA, and SOC 2 standards.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Features
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>End-to-end encryption for all files</li>
              <li>Secure file sharing with password protection</li>
              <li>Real-time collaboration with granular permissions</li>
              <li>Automatic backups across multiple data centers</li>
            </ul>
            <a
              href="/marketing#features"
              className="inline-block px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition-colors"
            >
              Explore Features
            </a>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Pricing
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>Free plan: 5GB storage, basic sharing</li>
              <li>Premium: 2TB for $9.99/month</li>
              <li>Business: Unlimited storage, $15/user/month</li>
              <li>14-day free trial on all paid plans</li>
            </ul>
            <a
              href="/marketing#pricing"
              className="inline-block px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition-colors"
            >
              View Pricing
            </a>
          </div>

          {/* Team & Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Connect With Us
            </h3>
            <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>
                <a
                  href="/marketing#team"
                  className="hover:text-accent-500 dark:hover:text-accent-400"
                >
                  Meet Our Team
                </a>
              </li>
              <li>
                Email:{' '}
                <a
                  href="mailto:support@securevault.com"
                  className="hover:text-accent-500 dark:hover:text-accent-400"
                >
                  support@securevault.com
                </a>
              </li>
              <li>Phone: +1 (800) 123-4567</li>
              <li>Based in Switzerland for maximum privacy</li>
            </ul>
            <a
              href="/contact"
              className="inline-block px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
          <p className="text-sm text-neutral-700 dark:text-neutral-300 font-[--font-geist-mono]">
            © {new Date().getFullYear()} SecureVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}