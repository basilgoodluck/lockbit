// /auth/callback/page.tsx
import { Suspense } from 'react';
import CallbackPage from './CallbackPage'; // Adjust path if needed; rename your original component file to CallbackClient.tsx or similar
import { ClipLoader } from 'react-spinners';

export default function CallbackWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
          <div className="flex flex-col items-center gap-4">
            <ClipLoader color="#eee" size={48} />
            <p className="text-lg text-neutral-900 dark:text-neutral-100">
              Processing login...
            </p>
          </div>
        </div>
      }
    >
      <CallbackPage />
    </Suspense>
  );
}