import React from 'react';
import './Consultation.css';
import { ConsultationDetails } from 'src/hooks/useConsultation';
import Unit from '../Unit';

interface ConsultationDetailsProps {
  consultation: ConsultationDetails | null;
}

const Consultation: React.FC<ConsultationDetailsProps> = ({ consultation }) => {
  return (
    <>
      {consultation && (
        <Unit
          paddingTop="md"
          paddingBottom="md"
          className="consultation-details"
        >
          <h3 className="consultation-title">Active Consultation</h3>
          <p>{`Selected Date: ${consultation.selectedDate}`}</p>
          <p>{`Start Time: ${consultation.startTime}`}</p>
          <p>{`End Time: ${consultation.endTime}`}</p>
        </Unit>
      )}

      {!consultation && (
        <Unit
          paddingTop="md"
          paddingBottom="md"
          className="consultation-details"
        >
          <p>No Active Consultations</p>
        </Unit>
      )}
    </>
  );
};

export default Consultation;
