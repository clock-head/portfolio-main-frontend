import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Unit from '../components/Unit';
import { Card } from '../components/Card';
import Button from '../components/Button';
import { useQuery } from '../hooks/useQuery';

export const VerifyEmailPage = () => {
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState({ show: false, type: '', message: '' });
  const query = useQuery();
  const token = query.get('token');

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/auth/verify-email?token=${token}`,
          {
            method: 'PATCH',
            credential: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        setModal({ show: true, type: 'success', message: data.message });
      } catch (error) {
        setModal({ show: true, type: 'error', message: error.message });
      }
    };

    verifyToken();
  }, [token]);

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
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      setModal({ show: true, type: 'success', message: data.message });
    } catch (error) {
      setModal({ show: true, type: 'error', message: error.message });
    }
  };

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
      <Section>
        <Card
          title="Verify Email"
          subtitle="thank you for signing up, please verify your email"
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

      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ show: false, type: '', message: '' })}
        ></Modal>
      )}
    </Layout>
  );
};
