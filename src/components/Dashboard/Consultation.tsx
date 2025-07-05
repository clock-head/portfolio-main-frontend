import React from 'react';
import './Consultation.css';
import { ConsultationDetails } from '../../hooks/useConsultation';
import Unit from '../Unit';
import Button from '../Button';

interface ConsultationDetailsProps {
  consultation: ConsultationDetails | null;
}

const Consultation: React.FC<ConsultationDetailsProps> = ({ consultation }) => {
  const pendingPaymentNotice = consultation?.isPaid;

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
          <span
            className={pendingPaymentNotice ? `pending-payment-notice` : ''}
          >
            {`Pending payment:`}{' '}
            <p>
              Your consultation will be cancelled 24 hours before selected date
              failing payment
            </p>
          </span>
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
