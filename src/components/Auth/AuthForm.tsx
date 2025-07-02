import React, { useState, useEffect } from 'react';
import './AuthForm.css';
import { useAuth } from '../../contexts/AuthProvider/AuthProvider';
import { AthenaCore } from 'athena-core';

interface AuthFormProps {
  mode: 'login' | 'signup';
  toggleAuthState: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, toggleAuthState }) => {
  const { login, signup, logout, loading, user } = useAuth();

  console.log(user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isStrongPassword, setIsStrongPassword] = useState<boolean>(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const passwordIsStrong = (): boolean => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return regex.test(password);
    };
    setIsStrongPassword(passwordIsStrong());
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      await login({ email, password });
    } else {
      if (isStrongPassword) {
        await signup({ email, password, firstName, lastName });
      } else {
        AthenaCore.openModal({
          title: 'Error',
          message: 'please use strong password',
          type: 'error',
        });
      }
    }
  };

  const showWeakPasswordPrompt =
    !isStrongPassword && password.length >= 7 ? true : false;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>

      {mode === 'signup' && (
        <>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p
          className={`weak-password-prompt ${
            showWeakPasswordPrompt ? 'show' : ''
          }`}
        >
          password must contain a minimum of 12 letters, numbers and capitals
        </p>
      </div>

      <button type="submit" disabled={loading}>
        {loading
          ? mode === 'login'
            ? 'Logging in...'
            : 'Signing up...'
          : mode === 'login'
          ? 'Login'
          : 'Sign Up'}
      </button>

      <p>
        {mode === 'login'
          ? "Don't have an account?"
          : 'Already have an account?'}{' '}
        <button type="button" onClick={toggleAuthState} className="auth-toggle">
          {mode === 'login' ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </form>
  );
};

export default AuthForm;
