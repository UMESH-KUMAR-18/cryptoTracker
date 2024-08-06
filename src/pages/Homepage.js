import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Homepage.css';

const CryptoTable = ({ cryptos, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className='intro'>
      <h1>Hi, Welcome to <span style={{color:'#6761c5'}}>MY Crypto Tracker</span> </h1>
      </div>
      <div className="cryptoTable">
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th style={{textAlign:'center'}}>Name</th>
            <th>Price</th>
            <th>24h % Change</th>
            <th>24h Volume</th>
            <th>Last 7 Days % Change</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <tr key={crypto.id}>
              <td style={{textAlign:'center'}}>{index + 1}</td>
              <td style={{textAlign:'center'}}>
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                  alt={crypto.name}
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                />
                {crypto.name} ({crypto.symbol})
              </td>
              <td>${crypto.quote.USD.price.toFixed(2)}</td>
              <td
                style={{
                  color: crypto.quote.USD.percent_change_24h >= 0 ? 'green' : 'red'
                }}
              >
                {crypto.quote.USD.percent_change_24h.toFixed(2)}%
              </td>
              <td>${crypto.quote.USD.volume_24h.toLocaleString()}</td>
              <td
                style={{
                  color: crypto.quote.USD.percent_change_7d >= 0 ? 'green' : 'red'
                }}
              >
                {crypto.quote.USD.percent_change_7d.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className='navigation'>
      <a className="prev" style={{marginRight: "20px"}} onclick="plusSlides(-1, 0)">&#10094;</a>
      <a className="next" onclick="plusSlides(1, 0)">&#10095;</a>
      </div>
      <Footer />
    </div>
  );
};

const Homepage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('/cryptocurrencies');
        setCryptos(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <div>
      <CryptoTable cryptos={cryptos} loading={loading} />
    </div>
  );
};

export default Homepage;
