const express = require('express');
const starCont = require('../controllers/starCont')

const router = express.Router();

router.post('/star', starCont.purchaseStar);

module.exports = router;