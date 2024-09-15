import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightBoard from './components/FlightBoard';
import FlightDetailsPage from './components/FlightDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightBoard />} />
        <Route path="/flights/:id" element={<FlightDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
