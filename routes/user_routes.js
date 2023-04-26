const express = require('express');
const router  = express.Router();
const userController = require('../Controllers/user');
const paymentController = require('../controllers/payment')

router.post('/login', userController.userLogin);
router.post('/signup', userController.addUser);
router.post('/create-checkout-session', paymentController.checkoutSession);

module.exports = router;