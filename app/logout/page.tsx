'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

const LogoutPage: FC = () => {
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOut({ 
          redirect: false,
          callbackUrl: '/' 
        });
        
        const timer: NodeJS.Timeout = setInterval(() => {
          setCountdown((prev: number) => prev - 1);
        }, 1000);

        const redirectTimer: NodeJS.Timeout = setTimeout(() => {
          window.location.href = '/';
        }, 3000);

        return () => {
          localStorage.clear();
          clearInterval(timer);
          clearTimeout(redirectTimer);
        };
      } catch (error) {
        console.error('Signout error:', error);
        window.location.href = '/';
      }
    };

    void performSignOut();
  }, []);

  const handleManualSignOut = (): void => {
    void signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl mb-4">Signing Out</h2>
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-base-content/80">
              Redirecting you in {countdown} seconds...
            </p>
          </div>
          <div className="card-actions mt-6">
            <button 
              className="btn btn-sm btn-ghost"
              onClick={handleManualSignOut}
              type="button"
            >
              Click here if you&apos;re not redirected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage; 