const TonTransaction = require('../models/tonTranscation')

module.exports = {
    collectTon: async (req, res) => {
        try {
            const { user_id, ton_amount } = req.body;
            console.log(req.body);

            if (!user_id || !ton_amount) {
                return res.status(400).json({ error: "user_id and ton_amount are required" });
            }

            const newTransaction = await TonTransaction.create({
                user_id,
                ton_amount
            });
            console.log(newTransaction);
            

            return res.status(201).json({
                transaction_id: newTransaction.transaction_id,
                ton_collected: newTransaction.ton_amount
            });
        } catch (error) {
            console.error('Error Collecting Ton', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }

    }
}