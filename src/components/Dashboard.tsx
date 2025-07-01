import React, { useEffect } from 'react';
import { useUserSession } from '../hooks/useUserSession';
import { useConsultation } from '../hooks/useConsultation';
import Section from './Section';
import './Dashboard.css';

interface DashboardProps {
  loggedIn: boolean;
}

const Dashboard = ({ loggedIn }: DashboardProps) => {
  const { user, loading } = useUserSession(loggedIn);
  const { fetchConsultation, consultation } = useConsultation();

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

        {consultation && (
          <div className="consultation-details">
            <p>{`Selected Date: ${consultation.selectedDate}`}</p>
            <p>
              {`Start Time: ${consultation.startTime}` ||
                'Start time Unavailable'}
            </p>
            <p>
              {`End Time: ${consultation.endTime}` || 'End time Unavailable'}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Dashboard;
