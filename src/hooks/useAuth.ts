import { useState } from 'react';
import { AthenaCore } from 'athena-core';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// interface Athena {
//   throwError: (err: { status: number; message: string }) => void;
//   pingRoute: (route: string) => void;
// }

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  // const athena: Athena = useAthena();

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const data = await response.json();
        AthenaCore.throwError({
          status: response.status,
          message: data?.message || 'Login failed',
        });
      }

      setUser(data.user);

      AthenaCore.redirect('/');
    } catch (error: any) {
      AthenaCore.throwError({
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : 'Unexpected error during login.',
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        AthenaCore.throwError({
          status: response.status,
          message: data?.message || 'Signup failed',
        });
      }

      setUser(data.user);
      AthenaCore.pingRoute('/auth/signup', { email: data.user?.email });
    } catch (error: any) {
      AthenaCore.throwError({
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : 'Unexpected error during signup.',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        AthenaCore.throwError({
          status: response.status,
          message: 'Logout failed.',
        });
      }

      setUser(null);
      AthenaCore.pingRoute('/auth/logout');
    } catch (error: unknown) {
      AthenaCore.throwError({
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : 'Unexpected error during logout.',
      });
    }
  };

  return { user, loading, login, logout, signup };
};
