import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { ProjectsPage } from './pages/ProjectsPage.jsx';
import { CalendarPage } from './pages/CalendarPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';

import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
