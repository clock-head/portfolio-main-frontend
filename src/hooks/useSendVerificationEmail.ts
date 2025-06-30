// hooks/useSendVerificationEmail.ts
import { AthenaCore } from 'athena-core';

export const useSendVerificationEmail = () => {
  const sendVerificationEmail = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/send-verification-email`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        AthenaCore.throwError({
          status: response.status,
          message: 'Failed to send verification email.',
        });
      }

      AthenaCore.openModal({
        title: 'Email Sent',
        message: 'A new verification email has been sent to your inbox.',
        type: 'info',
      });
    } catch (error) {
      AthenaCore.openModal({
        title: 'Send Failed',
        message:
          error instanceof Error
            ? error.message
            : 'Unknown error sending verification email.',
        type: 'error',
      });
    }
  };

  return { sendVerificationEmail };
};
