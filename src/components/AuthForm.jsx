import React, { useState } from 'react';
import './AuthForm.css'; // Assuming you have a CSS file for styling
import Unit from './Unit';
import Button from './Button';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const Form = ({ isSignup, isLogin, toggleAuthState }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const auth = isLogin ? 'login' : 'signup';

    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    let confirmPassword = '';
    let firstName = '';
    let lastName = '';

    if (isSignup) {
      confirmPassword = formData.get('confirm-password');
      firstName = formData.get('first-name');
      lastName = formData.get('last-name');
    }

    const payload = {
      email,
      password,
      ...(isSignup && { confirmPassword, firstName, lastName }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${auth}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // console.log(errorData);
        setError(errorData.message || 'An error occurred during login/signup');
        throw new Error(`Login FAailed: ${response.status}`);
      }

      const data = await response.json();
      setSuccess(`${auth} successful!`); // You can set a success message if needed
      navigate('/verify');
      console.log('Login successful:', data);
      // Handle successful login (e.g., redirect or show a success message)
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const message = error.response.data.message;
        // Show this message to the user
        setError(message || 'Too many requests. Please try again later.');
        return;
      }
      console.error('Error during login:', error.reponse);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <div>
      {error && (
        <Modal
          type="error"
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}

      {success && (
        <Modal
          type="success"
          message={success}
          onClose={() => {
            setSuccess(null);
          }}
        />
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <Unit layout="flex" gap="xl" alignItems="center">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          {isSignup && (
            <Button variant="authSecondary" onClick={toggleAuthState}>
              Login
            </Button>
          )}
          {isLogin && (
            <Button variant="authSecondary" onClick={toggleAuthState}>
              Sign Up
            </Button>
          )}
        </Unit>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        {isSignup && (
          <>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" required />
            </div>
          </>
        )}

        <button type="submit"> {isLogin ? 'Login' : 'Sign Up'} </button>
      </form>
    </div>
  );
};

export default Form;
