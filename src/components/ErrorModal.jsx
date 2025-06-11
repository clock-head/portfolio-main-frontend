import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="error-modal">
        <h3>Error</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
