'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { sendMagicLink } from '@/services/sendMagicLink';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      toast.error(decodeURIComponent(error).replace(/_/g, ' '));
    }
  }, [searchParams]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendMagicLink = async () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendMagicLink(email)
      console.log(response?.data.user)
      
      // if (respo)
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send magic link. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setSent(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center pt-25 pb-5 px-4">
      <div className="max-w-sm w-full space-y-6">
        <h1
          className="
            crazy-3d-title
            text-center
            font-extrabold
            text-neutral-900
            dark:text-neutral-50
            text-3xl
            sm:text-2xl
            md:text-3xl
            lg:text-4xl
            tracking-tight
            select-none
          "
        >
          Login
        </h1>
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg shadow-neutral-500 space-y-6">
          {sent ? (
            <div className="space-y-4 text-center">
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                Magic link sent to <span className="font-semibold">{email}</span>!
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Check your inbox to verify your email.
              </p>
              <button
                onClick={handleResend}
                className="px-4 py-2 text-sm rounded-md bg-accent-500 text-white border border-neutral-300 dark:border-neutral-600 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                Resend Magic Link
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email here"
                  className="w-full p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 outline-none focus:border-accent-500"
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    backgroundColor: 'transparent',
                    WebkitTextFillColor: 'inherit',
                    transition: 'background-color 9999s ease-in-out 0s',
                  }}
                  disabled={isLoading}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && email && !isLoading) {
                      handleSendMagicLink();
                    }
                  }}
                />
                <button
                  onClick={handleSendMagicLink}
                  disabled={isLoading || !email}
                  className={`
                    px-4 py-2 text-sm rounded-md bg-accent-500 text-white border border-neutral-300 dark:border-neutral-600
                    ${isLoading || !email ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'hover:bg-accent-600 cursor-pointer'}
                    focus:outline-none focus:ring-2 focus:ring-accent-500
                  `}
                >
                  {isLoading ? 'Sending...' : 'Send Magic Link'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}