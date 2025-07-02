import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { AthenaCore } from 'athena-core';
import { User, LoginCredentials, SignupCredentials } from '../../types/Auth';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadSession = async () => {
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
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);

          if (response.status === 401) {
            AthenaCore.throwError({
              status: data.status,
              message: data.message,
            });
          }

          if (response.status === 500) {
            AthenaCore.throwError({
              status: data.status,
              message: data.message,
            });
          }
        }
      } catch (error: unknown) {
        console.warn('[AuthProvider] Session fetch failed', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
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
        AthenaCore.throwError({
          status: response.status,
          message: data?.message || 'Login failed',
        });
      }

      setUser(data.user);
      setIsAuthenticated(true);
      AthenaCore.redirect('/');
    } catch (error: any) {
      AthenaCore.throwError({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Unexpected login error.',
      });
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
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
      const user = response.ok ? data.user : null;

      if (response.ok) {
        AthenaCore.openModal({
          title: 'Sign up Success',
          message: `thank you for signing up with us, ${user.firstName}`,
        });
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);

        if (response.status === 409) {
          AthenaCore.openModal({
            title: 'Error',
            message: 'Email already in use.',
            type: 'error',
          });
        }
        AthenaCore.throwError({
          status: response.status,
          message: data?.message || 'Sign Up failed.',
        });
      }
    } catch (error: any) {
      AthenaCore.throwError({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Unexpected Sign Up error.',
      });
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      AthenaCore.redirect('/');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false);
    } catch (error: any) {
      AthenaCore.throwError({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Unexpected login error.',
      });
    } finally {
      setUser(null);
      AthenaCore.redirect('/');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
