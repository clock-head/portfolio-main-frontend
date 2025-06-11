import React, { useState } from 'react';
import Button from './Button';
import AuthForm from './AuthForm';
import Section from './Section';
import Unit from './Unit';

const AuthFlow = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const toggleAuthState = () => {
    setIsLogin((prevState) => !prevState);
    setIsSignup((prevState) => !prevState);
  };
  return (
    <>
      {!isLogin && !isSignup && (
        <Unit layout="flex" gap="sm" justifyContent="left">
          <Button
            onClick={() => {
              setIsSignup((prevState) => true);
            }}
            variant="signup"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              setIsLogin((prevState) => true);
            }}
            variant="outline"
          >
            Login
          </Button>
        </Unit>
      )}

      {isLogin && (
        <Section justifyItems="left">
          <AuthForm isLogin={isLogin} toggleAuthState={toggleAuthState} />
        </Section>
      )}
      {isSignup && (
        <Section justifyItems="left">
          <AuthForm isSignup={isSignup} toggleAuthState={toggleAuthState} />
        </Section>
      )}
    </>
  );
};

export default AuthFlow;
