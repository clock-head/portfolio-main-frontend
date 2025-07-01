import { useState, useEffect } from 'react';
import { AthenaCore, ThrowErrorInput } from 'athena-core';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const useUserSession = (shouldEnforceSession = true) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldEnforceSession) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          AthenaCore.throwError({
            status: response.status,
            message: 'Server error.',
          });
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error: unknown) {
        const status = (error as any)?.status || 500;
        const message =
          error instanceof Error ? error.message : 'Unknown session error';

        if (status === 401) {
          AthenaCore.openModal({
            title: 'Login Required',
            message: 'please login to book a ',
          });
          AthenaCore.redirect('/');
        }

        AthenaCore.throwError({
          message,
          status,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [shouldEnforceSession]);

  return { user, loading };
};
