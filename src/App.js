// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CryptoConverter from './pages/CryptoConverter';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/converter" element={<CryptoConverter />} />
      </Routes>
    </Router>
  );
};

export default App;
