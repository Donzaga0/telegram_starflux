const Star = require('../models/star');
const StarPurchase = require('../models/starPurchase');
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
    },

    buyStar: async (req, res) => {
        try {
            const { user_id, ton_amount, star_amount } = req.body;
            console.log(req.body);


            if (!user_id || !ton_amount || !star_amount) {
                return res.status(400).json({ error: "user_id, ton_amount, and star_amount are required" });
            }

            // Create purchase record
            const purchase = await StarPurchase.create({
                user_id,
                ton_amount,
                star_amount
            });
            console.log(purchase);


            return res.status(201).json({
                transaction_id: purchase.transaction_id,
                stars_purchased: star_amount
            });

        } catch (error) {
            console.error('Error Buying Stars:', error.message);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },

    creditStars: async (req, res) => {
        try {

            const { user_id, star_amount } = req.body;

            if (!user_id || !star_amount) {
                return res.status(400).json({ error: "user_id and star_amount are required" });
            }

            // Simulate crediting the stars to Telegram account
            console.log(`Crediting ${star_amount} stars to Telegram user ${user_id}`);

            return res.status(200).json({ success: true });

        } catch (error) {
            console.error('Error Crediting Stars', error.message)
            return res.status(500).json({ message: 'Internal Server Error', error: error.message })
        }
    },

    getStarBalance: async (req, res) => {
        try {

            const { user_id } = req.body;
            console.log(req.body);
            

            if (!user_id) {
                return res.status(400).json({ error: "user_id is required" });
            }

            // Sum all credited stars for this user
            const totalStars = await StarPurchase.aggregate([
                { $match: { user_id } },
                { $group: { _id: null, total: { $sum: "$star_amount" } } }
            ]);

            const star_balance = totalStars.length > 0 ? totalStars[0].total : 0;

            return res.status(200).json({ star_balance });

        } catch (error) {
            console.error('Error Fetching Star Balance', error.message)
            return res.status(500).json({ message: 'Internal Server Error', error: error.message })
        }
    }
}