import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './CryptoConverter.css';

const CryptoConverter = () => {
  const [cryptos, setCryptos] = useState([]);
  const [fromCrypto, setFromCrypto] = useState('');
  const [toCrypto, setToCrypto] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('/cryptocurrencies');
        setCryptos(response.data.data);
        if (response.data.data.length > 0) {
          setFromCrypto(response.data.data[0].symbol);
          setToCrypto(response.data.data[1].symbol);
        }
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
      }
    };

    fetchCryptos();
  }, []);

  const handleConvert = async () => {
    if (!fromCrypto || !toCrypto || !amount) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get('/cryptocurrencies');
      const data = response.data.data;

      const fromCryptoData = data.find(crypto => crypto.symbol === fromCrypto);
      const toCryptoData = data.find(crypto => crypto.symbol === toCrypto);

      if (!fromCryptoData || !toCryptoData) {
        alert('Invalid cryptocurrency selected');
        setLoading(false);
        return;
      }

      const conversionRate = fromCryptoData.quote.USD.price / toCryptoData.quote.USD.price;
      setConvertedAmount(amount * conversionRate);
      setLoading(false);
    } catch (error) {
      console.error('Error converting cryptocurrencies:', error);
      setLoading(false);
    }
  };

  return (
    <div className="crypto-converter">
      <h1>Cryptocurrency Converter</h1>
      <div className="converter-container">
        <div className="input-section">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <select
            value={fromCrypto}
            onChange={(e) => setFromCrypto(e.target.value)}
          >
            {cryptos.map(crypto => (
              <option key={crypto.id} value={crypto.symbol}>
                {crypto.name} ({crypto.symbol})
              </option>
            ))}
          </select>
          <button onClick={handleConvert} className="convert-button">⇅</button>
          <select
            value={toCrypto}
            onChange={(e) => setToCrypto(e.target.value)}
          >
            {cryptos.map(crypto => (
              <option key={crypto.id} value={crypto.symbol}>
                {crypto.name} ({crypto.symbol})
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          convertedAmount !== null && (
            <div className="result-section">
              <p>{amount} {fromCrypto} = {convertedAmount.toFixed(6)} {toCrypto}</p>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CryptoConverter;
