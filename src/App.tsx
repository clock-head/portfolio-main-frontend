import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.js';
import { ProjectsPage } from './pages/ProjectsPage';
import { CalendarPage } from './pages/CalendarPage';
import { ContactPage } from './pages/ContactPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { PaymentPage } from './pages/PaymentPage.js';

import { useNavigate } from 'react-router-dom';
import { navigateRef } from 'athena-core/ref/navigateRef';
import { modalRef, ModalRefType } from 'athena-core/ref/modalRef';
import Modal from './components/Modal.js';

import './styles/global.css';

function App() {
  const modalController = useRef<{
    openModal: (params: ModalRefType) => void;
    closeModal: () => void;
  }>(null);

  const navigate = useNavigate();

  useEffect(() => {
    modalRef.current = {
      openModal: (params) => {
        modalController.current?.openModal(params);
      },
      closeModal: () => {
        modalController.current?.closeModal();
      },
    };

    navigateRef.goTo = (path: string) => {
      navigate(path);
    };
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <Modal ref={modalController}></Modal>
    </>
  );
}

export default App;
