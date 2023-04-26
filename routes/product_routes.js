const express = require('express');
const router  = express.Router();
const productController = require('../Controllers/products');

router.post('/addproduct', productController.addproduct);
router.get('/getproducts', productController.getproducts);

module.exports = router;