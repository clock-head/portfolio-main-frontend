import React from 'react';
import './Modal.css';

const Modal = ({ type = 'error', message, onClose }) => {
  // Determine the modal styling based on type
  const modalTitle = type === 'success' ? 'Success' : 'Error';
  const modalTitleColor = type === 'success' ? '#2edffa' : '#ff4d4f';

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 style={{ color: modalTitleColor }}>{modalTitle}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
