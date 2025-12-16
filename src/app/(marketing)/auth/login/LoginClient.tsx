// LoginClient.tsx
'use client';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { loginUser } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

export default function LoginClient() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>()
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valid = validateEmail(event.target.value);
    setEmail(event.target.value);
    setCanSubmit(valid);
  };
  const handleSendMagicLink = async () => {
    if (!canSubmit) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(loginUser({ email })).unwrap()
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
    setCanSubmit(false);
  };
  return (
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
              {sent ? (
                <div className="space-y-4 flex items-start justify-between flex-col">
                  <p className="text-lg text-neutral-900 dark:text-neutral-200">
                    We have sent an email with instructions on how to login to{' '}
                    <span className="font-semibold text-amber-300">{email}</span>!
                  </p>
                  <div className="dark:text-neutral-200">
                    Didn't receive email? Click{' '}
                    <button
                      onClick={handleResend}
                      className="text-sm inline underline cursor-pointer"
                    >
                      here
                    </button>{' '}
                    to resend.
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <input
                      type="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter your email here"
                      className="w-full p-4 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 outline-none focus:border-accent-500"
                      style={{
                        WebkitBoxShadow: '0 0 0 1000px transparent inset',
                        backgroundColor: 'transparent',
                        WebkitTextFillColor: 'inherit',
                        transition: 'background-color 9999s ease-in-out 0s',
                      }}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && email && !isLoading) {
                          handleSendMagicLink();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendMagicLink}
                      disabled={isLoading || !canSubmit}
                      className={`
                        p-4 text-sm rounded-md bg-accent-500 text-white border border-neutral-300 dark:border-neutral-600
                        ${isLoading || !canSubmit ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent-600 cursor-pointer'}
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
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}