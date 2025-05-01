export function Footer() {
  return (
    <footer className="bg-primary-50 dark:bg-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center space-y-4">
        <div className="space-x-4">
          <a
            href="/marketing#features"
            className="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400"
          >
            Features
          </a>
          <a
            href="/marketing#pricing"
            className="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400"
          >
            Pricing
          </a>
          <a
            href="/marketing#team"
            className="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400"
          >
            Team
          </a>
          <a
            href="#"
            className="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400"
          >
            Contact
          </a>
        </div>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 font-[--font-geist-mono]">
          © {new Date().getFullYear()} Data Encryption App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}