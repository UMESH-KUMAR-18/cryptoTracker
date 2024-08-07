const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.CMC_API_KEY;

app.get('/cryptocurrencies', async (req, res) => {
  const start = req.query.start || 1;
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        start,
        limit: 10, // Limit to 10 cryptocurrencies
      },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

app.get('/cryptocurrency', async (req, res) => {
  try {
    const symbol = req.query.symbol.toUpperCase();
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`, {
      params: { symbol },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

app.get('/convert', async (req, res) => {
  const { amount, from, to } = req.query;
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/tools/price-conversion', {
      params: {
        amount,
        symbol: from,
        convert: to,
      },
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });
    res.json({ result: response.data.data.quote[to].price });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to convert currency' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
