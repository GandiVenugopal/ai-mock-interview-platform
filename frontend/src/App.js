import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobList from './pages/JobList';
import InterviewPage from './pages/InterviewPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="/interview/:jobId" element={<InterviewPage />} />
    </Routes>
  );
}

export default App;

