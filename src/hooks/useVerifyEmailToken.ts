// hooks/useVerifyEmailToken.ts
import { useEffect } from 'react';
import { AthenaCore } from 'athena-core';

export const useVerifyEmailToken = (token: string | null) => {
  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/auth/verify-email?token=${token}`,
          {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          AthenaCore.throwError({
            status: response.status,
            message: 'Verification failed. Invalid or expired token.',
          });
        }

        await response.json();

        AthenaCore.openModal({
          title: 'Email Verified',
          message: 'Your email has been successfully verified.',
          type: 'info',
        });

        AthenaCore.redirect('/');
      } catch (error) {
        AthenaCore.openModal({
          title: 'Verification Failed',
          message:
            error instanceof Error
              ? error.message
              : 'Unknown error during email verification.',
          type: 'error',
        });
      }
    };

    verifyToken();
  }, [token]);
};
