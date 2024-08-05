// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
      <header className="header">
        <nav>
          <div className="nav_links">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/converter">CryptoConverter</Link></li>
            </ul>
          </div>
          <div className="search">
            <input type="text" placeholder="Search..." />
          </div>
        </nav>
      </header>

    );
  };

export default Header;
