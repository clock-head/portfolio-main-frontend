import React from 'react';
import './ConsultationDetails.css';
import { ConsultationDetails } from 'src/hooks/useConsultation';

interface ConsultationDetailsProps {
  consultation: ConsultationDetails | null;
}

const ConsultationDetails: React.FC<ConsultationDetailsProps> = ({
  consultation,
}) => {
  return (
    <>
      {consultation && (
        <div className="consultation-details">
          <p>{`Selected Date: ${consultation.selectedDate}`}</p>
          <p>{`Start Time: ${consultation.startTime}`}</p>
          <p>{`End Time: ${consultation.endTime}`}</p>
        </div>
      )}

      {!consultation && (
        <div className="consultation-details">
          <p>No Active Consultations</p>
        </div>
      )}
    </>
  );
};

export default ConsultationDetails;
