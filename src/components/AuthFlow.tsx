import React, { useState } from 'react';
import Button from './Button';
import AuthForm from './AuthForm';
import Section from './Section';
import Unit from './Unit';

const AuthFlow: React.FC = () => {
  const [mode, setMode] = useState<string | null>(null);

  const toggleAuthState = () => {
    if (mode === 'login') {
      setMode('signup');
    } else {
      setMode('login');
    }
  };
  return (
    <>
      {mode === null && (
        <Unit layout="flex" gap="sm" justifyContent="left">
          <Button
            onClick={() => {
              setMode((prevState) => 'signup');
            }}
            variant="signup"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              setMode((prevState) => 'login');
            }}
            variant="outline"
          >
            Login
          </Button>
        </Unit>
      )}

      {mode === 'login' && (
        <Section
          id=""
          layout=""
          alignContent=""
          alignItems=""
          justifyContent=""
          justifyItems="left"
          width=""
          gap=""
          background=""
          padding=""
        >
          <AuthForm mode={mode} toggleAuthState={toggleAuthState} />
        </Section>
      )}
      {mode === 'signup' && (
        <Section
          id=""
          layout=""
          justifyItems="left"
          justifyContent=""
          alignContent=""
          alignItems=""
          width=""
          gap=""
          background=""
          padding=""
        >
          <AuthForm mode={mode} toggleAuthState={toggleAuthState} />
        </Section>
      )}
    </>
  );
};

export default AuthFlow;
