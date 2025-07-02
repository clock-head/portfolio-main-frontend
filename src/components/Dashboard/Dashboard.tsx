import React, { useEffect } from 'react';
import { useConsultation } from '../../hooks/useConsultation';
import ConsultationDetails from './ConsultationDetails';
import { User } from '../../types/Auth';
import Section from '../Section';
import './Dashboard.css';

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const { fetchConsultation, consultation, loading } = useConsultation();

  useEffect(() => {
    const fetchUserConsultation = async () => {
      if (user) {
        await fetchConsultation(user);
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
        <ConsultationDetails consultation={consultation}></ConsultationDetails>
      </div>
    </Section>
  );
};

export default Dashboard;
