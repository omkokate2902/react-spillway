// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import CreateExam from './pages/CreateExam';
import TestDetails from './pages/TestDetails'; // Import TestDetails
import VerifyCandidate from './pages/VerifyCandidate'; // Import VerifyCandidate

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthComponent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/test/:id" element={<TestDetails />} /> // Test details route
        <Route path="/verify-candidate" element={<VerifyCandidate />} /> // Verification page route
      </Routes>
    </Router>
  );
};

export default App;