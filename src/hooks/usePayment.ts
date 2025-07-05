import { useState, useEffect } from 'react';
import { AthenaCore } from 'athena-core';

interface usePaymentResult {
  initiatePayment: (consultationId: number) => Promise<void>;
  checkoutReady: boolean;
  checkoutUrl: string;
}

export const usePayment = (): usePaymentResult => {
  const [checkoutReady, setCheckoutReady] = useState<boolean>(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');

  const initiatePayment = async (consultationId: number): Promise<void> => {
    if (!consultationId) {
      AthenaCore.throwError({
        status: 404,
        message: 'consultation id not found.',
      });
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stripe/create-checkout-session`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ consultationId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          AthenaCore.throwError({
            status: data.status,
            message:
              'Consultation not found. [Leak-detected] consultation booking flow fracture.',
          });

          // Send an email to Operator to seal the leak if it occurs.
        }
      }

      console.log('Payment initiated:', data.checkoutUrl);

      setCheckoutReady(true);
      setCheckoutUrl(data.checkoutUrl);
    } catch (error: unknown) {
      AthenaCore.openModal({
        title: 'Error',
        message: 'Internal Server Error. Please try again later.',
        type: 'error',
      });

      AthenaCore.throwError({
        status: 500,
        message: `Internal Server Error. [Leak-detected] ${error}`,
      });
    }
  };

  return { initiatePayment, checkoutReady, checkoutUrl };
};
