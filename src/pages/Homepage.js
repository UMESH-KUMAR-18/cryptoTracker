import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import Header from '../components/Header';
import Footer from '../components/Footer';
import './Homepage.css';
import '../components/mediaQuery.css';


const CryptoTable = ({ cryptos, loading, onNext, onPrev, page }) => {
  return (
    <div className='homep'>
      <div className='intro'>
        <h1>Hi, Welcome to <span style={{color:'#6761c5'}}>MY Crypto Tracker</span></h1>
      </div>
      <div className="cryptoTable">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th style={{textAlign:'center'}}>Name</th>
              <th>Price</th>
              <th>24h%</th>
              <th id='tar1'>24h Volume</th>
              <th> 7d%</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td style={{textAlign:'center'}}>{(page - 1) * 10 + index + 1}</td>
                <td id ="size" style={{textAlign:'center'}}>
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                    alt={crypto.name}
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
                <td id='tar1'>${crypto.quote.USD.volume_24h.toLocaleString()}</td>
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
        <button className="prev" onClick={onPrev} disabled={page === 1}>&#10094; Prev</button>
        <button className="next" onClick={onNext}>Next &#10095;</button>
      </div>
      {loading && <div>Loading...</div>}
      <Footer />
    </div>
  );
};

const Homepage = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCryptos = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get('/cryptocurrencies', {
        params: { start: (page - 1) * 10 + 1 }
      });
      setCryptos(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos(page);
  }, [page]);

  const handleNext = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <CryptoTable cryptos={cryptos} loading={loading} onNext={handleNext} onPrev={handlePrev} page={page} />
    </div>
  );
};

export default Homepage;
