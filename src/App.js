// src/App.js
import React , {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import CreateExam from './pages/CreateExam';
import TestDetails from './pages/TestDetails'; // Import TestDetails
import VerifyCandidate from './pages/VerifyCandidate'; // Import VerifyCandidate
import LandingPage from './pages/LandingPage';

const App = () => {
  const [getImage, setGetImage] = useState()
  const [userId, setUserId] = useState("")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthComponent />} />
        <Route path="/profile" element={<Profile setGetImage={setGetImage}/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/test/:id" element={<TestDetails />} /> // Test details route
        <Route path="/verify-candidate" element={<VerifyCandidate userId={userId} getImage={getImage} />} /> // Verification page route
      </Routes>
    </Router>
  );
};

export default App;