const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const { getCart, addToCart, removeFromCart } = require('../controller/cart');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.post('/remove', protect, removeFromCart);

module.exports = router;
