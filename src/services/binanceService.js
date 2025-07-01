const axios = require('axios')
const fetch = require('node-fetch'); // Use node-fetch for server-side requests

const service = {
  getTONPrice: async () => {


    let cachedPrice = null;
    let lastFetchedTime = null;
    const CACHE_DURATION_MS = 60 * 1000
    try {

      const now = Date.now();

      // check if cache is still fresh
      if (cachedPrice && lastFetchedTime && (now - lastFetchedTime) < CACHE_DURATION_MS) {
        console.log(`⚡ Returning cached TON price: $${cachedPrice}`);
        return cachedPrice;
      }
      console.log("➡️ Fetching TON price from CoinGecko...");

      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd'
      );

      if (!response.ok) {
        console.error(`Failed response: ${response.status} ${response.statusText}`);
        return cachedPrice;
      }

      const data = await response.json();
      const price = parseFloat(data["the-open-network"].usd);

      console.log(`CoinGecko returned TON price: $${price}`);

      cachedPrice = price;
      lastFetchedTime = now;

      return price;

    } catch (error) {
      console.error("Error fetching TON price from CoinGecko:", error.message);
      return cachedPrice;
    }
    // try {
    //   const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=TONUSDT');

    //   if (!response.ok) {
    //     console.error('Failed to fetch TON price:', response.statusText);
    //     return null; // Return null instead of throwing
    //   }

    //   const data = await response.json();
    //   return parseFloat(data.price);
    // } catch (error) {
    //   console.error('Error fetching TON price:', error.message);
    //   return null; // Gracefully return null on error
    // }
  }
};

module.exports = service;
