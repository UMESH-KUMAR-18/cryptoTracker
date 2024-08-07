import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CryptoConverter from './pages/CryptoConverter';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/converter" element={<CryptoConverter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
