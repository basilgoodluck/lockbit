// /auth/login/page.tsx
import { Suspense } from 'react';
import LoginClient from './LoginClient'; // Adjust path if needed; rename your original component file to LoginClient.tsx or similar

export default function LoginWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
          <div className="w-full h-screen justify-between flex flex-col md:flex-row">
            <div
              className="w-full h-full bg-cover bg-no-repeat bg-center bg-fixed "
              style={{ backgroundImage: 'url(/images/log.jpg)' }}
            ></div>
            <div className="w-full md:w-1/2 flex items-center justify-center py-10 px-4">
              <div className="max-w-sm w-full space-y-6">
                <h1
                  className="
                    text-center
                    text-neutral-900
                    dark:text-neutral-50
                    text-2xl
                    sm:text-xl
                    md:text-2xl
                    lg:text-3xl
                    select-none
                  "
                >
                  Login to your account
                </h1>
                <div className="bg-white dark:bg-neutral-800 rounded-lg space-y-6 p-10">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <input
                        type="email"
                        placeholder="Enter your email here"
                        className="w-full p-4 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 outline-none focus:border-accent-500"
                        style={{
                          WebkitBoxShadow: '0 0 0 1000px transparent inset',
                          backgroundColor: 'transparent',
                          WebkitTextFillColor: 'inherit',
                          transition: 'background-color 9999s ease-in-out 0s',
                        }}
                        disabled
                      />
                      <button
                        disabled
                        className="p-4 text-sm rounded-md bg-accent-500 text-white border border-neutral-300 dark:border-neutral-600 opacity-50 cursor-not-allowed"
                      >
                        Send Magic Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}