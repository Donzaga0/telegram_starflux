const axios = require('axios')
const fetch =  require('node-fetch'); // Use node-fetch for server-side requests

const service = {
  getTONPrice: async () => {
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=TONUSDT');

      if (!response.ok) {
        console.error('Failed to fetch TON price:', response.statusText);
        return null; // Return null instead of throwing
      }

      const data = await response.json();
      return parseFloat(data.price);
    } catch (error) {
      console.error('Error fetching TON price:', error.message);
      return null; // Gracefully return null on error
    }
  }
};

module.exports = service;
