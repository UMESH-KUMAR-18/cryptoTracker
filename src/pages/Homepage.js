import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import './Homepage.css';
import '../components/mediaQuery.css';

const Homepage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://cryptotracker-1v42.onrender.com/cryptocurrencies', {
          params: { start: 1, limit: 100 }
        });
        setCryptos(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
        setError('Error fetching cryptocurrencies');
        setLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="homepage">
      <h1 className="homepage-title">Crypto Tracker</h1>
      <div className="crypto-table">
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Volume (24h)</th>
              <th>Change (24h)</th>
              <th>Change (7d)</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr key={crypto.id}>
                <td><img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`} alt={crypto.name} /></td>
                <td>{crypto.name}</td>
                <td>{crypto.symbol}</td>
                <td>${crypto.quote.USD.price.toFixed(2)}</td>
                <td>${crypto.quote.USD.volume_24h.toLocaleString()}</td>
                <td>{crypto.quote.USD.percent_change_24h.toFixed(2)}%</td>
                <td>{crypto.quote.USD.percent_change_7d.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;


