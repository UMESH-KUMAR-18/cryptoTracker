import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import './CryptoConverter.css';
import '../components/mediaQuery.css';

const CryptoConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [conversionResult, setConversionResult] = useState(null);
  const [cryptoList, setCryptoList] = useState([]);
  const [error, setError] = useState('');
  const [fromCurrencyPrice, setFromCurrencyPrice] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://cryptotracker-1v42.onrender.com/cryptocurrencies', {
          params: { start: 1, limit: 100 }
        });
        setCryptoList(response.data.data);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
      }
    };
    fetchCryptos();
  }, []);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleCalculate = async () => {
    if (fromCurrency && toCurrency && amount) {
      const fromCurrencyExists = cryptoList.some((crypto) => crypto.symbol === fromCurrency);
      const toCurrencyExists = cryptoList.some((crypto) => crypto.symbol === toCurrency);

      if (!fromCurrencyExists || !toCurrencyExists) {
        setError("Coin doesn't exist");
        setConversionResult(null);
        setFromCurrencyPrice(null);
        return;
      }

      try {
        const response = await axios.get('https://cryptotracker-1v42.onrender.com/convert', {
          params: {
            amount,
            from: fromCurrency,
            to: toCurrency
          }
        });
        setConversionResult(response.data.result);

        const priceResponse = await axios.get('https://cryptotracker-1v42.onrender.com/convert', {
          params: {
            amount: 1,
            from: fromCurrency,
            to: 'USDT'
          }
        });
        setFromCurrencyPrice(priceResponse.data.result);
        
        setError('');
      } catch (error) {
        console.error('Error converting currencies:', error);
        setError('Error converting currencies');
        setConversionResult(null);
        setFromCurrencyPrice(null);
      }
    } else {
      setError('Please fill out all fields');
      setConversionResult(null);
      setFromCurrencyPrice(null);
    }
  };

  return (
    <div className='convContainer'>
      <div className="converter">
        <h2 style={{textAlign:'center',margin:"8px",color:"rgb(103, 97, 197)"}}>Crypto Converter</h2>
        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="input-group">
          <label>From</label>
          <input
            type="text"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
            placeholder="Search currency"
            list="cryptoList"
          />
          <datalist id="cryptoList">
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.symbol}>{crypto.name}</option>
            ))}
          </datalist>
        </div>
        <button onClick={handleSwap}>Swap</button>
        <div className="input-group">
          <label>To</label>
          <input
            type="text"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
            placeholder="Search currency"
            list="cryptoList"
          />
          <datalist id="cryptoList">
            {cryptoList.map((crypto) => (
              <option key={crypto.id} value={crypto.symbol}>{crypto.name}</option>
            ))}
          </datalist>
        </div>
        <button onClick={handleCalculate}>Calculate</button>
        {error && <div className="error">{error}</div>}
        {conversionResult !== null && (
          <div className="result">
            <h2>Conversion Result</h2>
            <p>{amount} {fromCurrency} = {conversionResult} {toCurrency}</p>
            <p>{fromCurrency} Price in USDT: {fromCurrencyPrice !== null ? `$${fromCurrencyPrice.toFixed(2)}` : 'Fetching...'}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CryptoConverter;
