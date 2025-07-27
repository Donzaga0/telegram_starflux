const express = require('express');
const tonCont = require('../controllers/tonCont');

const router = express.Router();

router.post('/collect-ton', tonCont.collectTon)

module.exports = router