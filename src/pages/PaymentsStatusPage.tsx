import { useEffect } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Unit from '../components/Unit';
import { Card } from '../components/Card';
import Button from '../components/Button';
import { useQuery } from '../hooks/useQuery';
import { AthenaCore } from 'athena-core';

export const PaymentStatusPage = () => {
  const query = useQuery();

  const status = query.get('status');
  const consultationId = query.get('consultationId');

  const context = {
    section: {
      layout: 'grid',
      background: 'bg-dark',
      justifyItems: 'center',
    },
    unit: {
      colSpan: '1',
    },
  };

  const handleNext = () => {
    AthenaCore.redirect('/');
  };

  const success = status === 'success';
  const failure = status === 'failure';

  console.log(success, failure, consultationId);

  useEffect(() => {
    if (!success && !failure) {
      AthenaCore.redirect('/');
    }
  }, [status]);

  return (
    <Layout
      layout="grid"
      spacing="gap-md"
      alignContent="center"
      justifyItems="center"
      background="bg-dark"
      context={context}
    >
      <Section
        id=""
        layout="grid"
        background="bg-dark"
        alignContent=""
        alignItems=""
        justifyContent=""
        justifyItems=""
        width=""
        gap=""
        padding=""
      >
        <Card
          title={success ? 'Payment Successful' : 'Payment Failed'}
          subtitle={
            success
              ? 'Thank you for your payment. Your consultation is confirmed.'
              : 'Your payment was not successful. Please try again.'
          }
          className=""
          context=""
          footer={null}
        >
          {success && (
            <>
              <p>
                You will receive a confirmation email shortly with your
                consultation details.
              </p>
              <p>Consultation ID: {consultationId || 'Unavailable'}</p>
            </>
          )}

          {failure && (
            <p>
              Please check your payment details or try again later. Contact
              support if the issue persists.
            </p>
          )}

          <Button onClick={handleNext} variant="outline" className="mt-4">
            Return to Home
          </Button>
        </Card>
      </Section>
    </Layout>
  );
};
