import { FaGithub, FaXTwitter, FaDiscord } from "react-icons/fa6";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-primary-50 dark:bg-neutral-800 shadow-lg shadow-neutral-700 fixed top-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Image src={'/images/logo.png'} alt="logo" width={100} height={100} />
        <div className="flex items-center space-x-4">
          <div className="flex space-x-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              aria-label="X"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              aria-label="Discord"
            >
              <FaDiscord size={24} />
            </a>
          </div>
          <button
            className="px-4 py-2 bg-accent-500 text-white rounded-md font-semibold hover:bg-accent-600 dark:hover:bg-accent-400 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}