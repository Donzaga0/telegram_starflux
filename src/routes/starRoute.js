const express = require('express');
const starCont = require('../controllers/starCont')

const router = express.Router();

router.post('/star', starCont.purchaseStar);
router.post('/buy-stars', starCont.buyStar);
router.post('/credit-stars', starCont.creditStars);
router.get('/get-star-balance', starCont.getStarBalance)

module.exports = router;