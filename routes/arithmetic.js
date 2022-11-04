const express = require('express');
const router = express.Router();

const arithmeticController = require('../controllers/arithmeticController');

router.post('/', arithmeticController.handleArithmetic);

module.exports = router;