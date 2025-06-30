import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Unit from '../components/Unit';
import { Card } from '../components/Card';
import Button from '../components/Button';
import { useQuery } from '../hooks/useQuery';
import { useVerifyEmailToken } from '../hooks/useVerifyEmailToken';
import { useSendVerificationEmail } from '../hooks/useSendVerificationEmail';
import { AthenaCore } from 'athena-core';

export const VerifyEmailPage: React.FC = () => {
  const query = useQuery();
  const token = query.get('token');

  useVerifyEmailToken(token);

  const { sendVerificationEmail } = useSendVerificationEmail();

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
          title="Verify Email"
          subtitle="Thank you for signing up. Please verify your email."
          className=""
          context=""
          footer={null}
        >
          <Unit layout="flex" justifyContent="left" alignItems="left">
            {!token && (
              <Button onClick={sendVerificationEmail}>
                Send Verification Email
              </Button>
            )}
          </Unit>
        </Card>
      </Section>
    </Layout>
  );
};
