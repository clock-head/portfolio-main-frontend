import React, { useEffect } from 'react';
import { useConsultation } from '../../hooks/useConsultation';
import Consultation from './Consultation';
import { User } from '../../types/Auth';
import Section from '../Section';
import './Dashboard.css';
import Button from '../Button';
import { useAuth } from '../../contexts/AuthProvider/AuthProvider';

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const { fetchConsultation, consultation, loading } = useConsultation();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserConsultation = async () => {
      if (user) {
        await fetchConsultation();
      }
    };

    fetchUserConsultation();
  }, []);

  return (
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
      <div className="consultation-container">
        {loading && <div>... loading</div>}
        <h3 className="user-details">{`Welcome ${user?.firstName} ${user?.lastName}`}</h3>
        <Consultation consultation={consultation}></Consultation>
        <Button variant="outline" onClick={logout}>
          Log out
        </Button>
      </div>
    </Section>
  );
};

export default Dashboard;
