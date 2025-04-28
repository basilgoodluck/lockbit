export function Footer() {
    return (
      <footer className="bg-primary-50 dark:bg-neutral-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-sm text-neutral-700 dark:text-neutral-300 font-[--font-geist-mono]">
            &copy; {new Date().getFullYear()} Data Encryption App. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }