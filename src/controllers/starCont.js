const  Star = require('../models/star');
const { getTONPrice } = require('../services/binanceService');
const { calculatePrice } = require('../utils/calculate_price');

module.exports = {
    purchaseStar: async (req, res) => {
        try {
            const { recipient, stars } = req.body;

            if (stars < 50 || stars > 1000000) {
                return res.status(400).json({ error: "Invalid star quantity" });
            }

            const tonPrice = await getTONPrice();
            const { pricePerStarUSD, totalUSD, totalTON, profitUSD, profitTON } = calculatePrice(stars, tonPrice);

            // if (profitTON > 0) {
            //     await sendToProfitWallet(profitTON); // API call to send profit
            // }

            const newOrder = await Star.create({
                recipient,
                stars,
                pricePerStarUSD,
                totalUSD,
                totalTON,
                profitUSD,
                profitTON
            });

            res.status(200).json({ message: "Purchase successful", data: newOrder });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}