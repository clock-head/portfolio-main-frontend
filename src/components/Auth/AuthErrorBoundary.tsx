import React from 'react';
import { AthenaCore } from 'athena-core';

interface AuthErrorBoundaryProps {
  children: React.ReactNode;
}

interface AuthErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class AuthErrorBoundary extends React.Component<
  AuthErrorBoundaryProps,
  AuthErrorBoundaryState
> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    AthenaCore.pingRoute('/auth-error', {
      message: error.message,
      info,
    });

    AthenaCore.openModal({
      title: 'Authentication Error',
      message: error.message || 'Something went wrong during authentication.',
      type: 'error',
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default AuthErrorBoundary;
