var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product-helper')
/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    res.render('users/view-products', { admin: false, products:products});
  })
  
});

module.exports = router;
