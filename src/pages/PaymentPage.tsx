import { useEffect } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Unit from '../components/Unit';
import { Card } from '../components/Card';
import Button from '../components/Button';
import { useConsultation } from '../hooks/useConsultation';
import { usePayment } from '../hooks/usePayment';
import { useQuery } from '../hooks/useQuery';
import { useAuth } from '../contexts/AuthProvider/AuthProvider';
import Consultation from '../components/Dashboard/Consultation';

export const PaymentPage = () => {
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

  const query = useQuery();
  const type = query.get('type');
  const { user } = useAuth();
  const { fetchConsultation, consultation, loading } = useConsultation();
  const { initiatePayment, checkoutReady, checkoutUrl } = usePayment();

  useEffect(() => {
    console.log('PaymentPage mounted');
    console.log(user);
    if (!user) return;

    const getUserConsultation = async () => {
      await fetchConsultation(user);
      console.log('Consultation fetched:', consultation);
      if (consultation) {
        console.log('Consultation fetched 2:', consultation);
        await initiatePayment(consultation.consultation_id);
      }
    };

    console.log('type', type);

    if (type === 'consultation') {
      console.log('Fetching user consultation');
      getUserConsultation();
    }

    // if (type === 'subscription') {  }
  }, []);

  console.log('checkoutReady', checkoutReady);

  const proceedToCheckout = async () => {
    window.location.href = checkoutUrl;
  };

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
          title="Thank you for booking with us."
          subtitle="Redirecting to payment."
          className=""
          context=""
          footer={null}
        >
          {loading && <p>One moment...</p>}
          {consultation && (
            <Consultation consultation={consultation}></Consultation>
          )}

          {checkoutReady && consultation && (
            <Button variant="outline" onClick={proceedToCheckout}>
              Proceed To Payment
            </Button>
          )}
        </Card>
      </Section>
    </Layout>
  );
};
