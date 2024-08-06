import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState('');
  const searchRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        setCryptoData(null);
        setError('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setCryptoData(null);
      setError('');
      return;
    }

    try {
      const response = await axios.get(`/cryptocurrency`, {
        params: { symbol: searchQuery.trim().toUpperCase() }
      });

      const crypto = response.data.data[searchQuery.trim().toUpperCase()];

      if (crypto) {
        setCryptoData({
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.quote.USD.price.toFixed(2),
          volume: crypto.quote.USD.volume_24h.toLocaleString(),
          percentChange24h: crypto.quote.USD.percent_change_24h.toFixed(2),
          percentChange7d: crypto.quote.USD.percent_change_7d.toFixed(2),
          logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`
        });
        setError('');
      } else {
        setCryptoData(null);
        setError("Coin doesn't exist");
      }
    } catch (error) {
      console.error('Error fetching cryptocurrency:', error);
      setCryptoData(null);
      setError('Error fetching data');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <nav>
        <div className="nav_links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/converter">CryptoConverter</Link></li>
          </ul>
        </div>
        <div className="search" ref={searchRef}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {(cryptoData || error) && (
            <div className="floating-card" ref={cardRef}>
              {cryptoData && (
                <>
                  <div className='top'>
                    <img src={cryptoData.logo} alt={cryptoData.name} />
                    <h3>{cryptoData.name} ({cryptoData.symbol})</h3>
                  </div>
                  <div className="crypto-info">
                    <p>Price: ${cryptoData.price}</p>
                    <p>Volume (24h): ${cryptoData.volume}</p>
                    <p>24h Change: {cryptoData.percentChange24h}%</p>
                    <p>7d Change: {cryptoData.percentChange7d}%</p>
                  </div>
                </>
              )}
              {error && <p>{error}</p>}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
