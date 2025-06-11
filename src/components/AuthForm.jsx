import React from 'react';
import './AuthForm.css'; // Assuming you have a CSS file for styling
import Unit from './Unit';
import Button from './Button';
import ErrorModal from './ErrorModal';

const Form = ({ isSignup, isLogin, toggleAuthState }) => {
  const [error, setError] = React.useState(null);
  const handleSubmit = async (event) => {
    const auth = isLogin ? 'login' : 'signup';

    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('email');
    const password = formData.get('password');
    let firstName = '';
    let lastName = '';

    if (isSignup) {
      firstName = formData.get('first-name');
      lastName = formData.get('last-name');
    }

    const payload = {
      username,
      password,
      ...(isSignup && { firstName, lastName }),
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
        console.log(errorData);
        setError(errorData.message || 'An error occurred during login/signup');
        throw new Error(`Login FAailed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Handle successful login (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <div>
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
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
