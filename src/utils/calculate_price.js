// const utils = {
// calculatePrice: async (stars, tonPrice) => {
//     const basePriceUSD = 0.015;
//     const extraPerStarUSD = (stars <= 5000) ? 0.001 : 0;
//     const pricePerStarUSD = basePriceUSD + extraPerStarUSD;

//     const totalUSD = pricePerStarUSD * stars;
//     const totalTON = totalUSD / tonPrice;

//     const profitUSD = extraPerStarUSD * stars;
//     const profitTON = profitUSD / tonPrice;

//     return {
//         pricePerStarUSD,
//         totalUSD,
//         totalTON,
//         profitUSD,
//         profitTON
//     };
// }
// }

// module.exports = {utils};

// utils/starUtils.js

const calculatePrice = (stars, tonPrice) => {
  const basePriceUSD = 0.015;
  const extraPerStarUSD = stars <= 5000 ? 0.001 : 0;
  const pricePerStarUSD = basePriceUSD + extraPerStarUSD;

  const totalUSD = pricePerStarUSD * stars;
  const totalTON = totalUSD / tonPrice;

  const profitUSD = extraPerStarUSD * stars;
  const profitTON = profitUSD / tonPrice;

  return {
    pricePerStarUSD,
    totalUSD,
    totalTON,
    profitUSD,
    profitTON 
  };
};

module.exports = { calculatePrice };
