var express = require('express');
const { route } = require('./users');
var router = express.Router();
var productHelper = require('../helper/product-helper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/view-products',{admin:true})
});


router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  productHelper.addProduct(req.body,(objId)=>{
    let image = req.files.image
    image.mv('./public/product-images/' + objId +'.jpg',(err,done)=>{
      if(err){
        console.log("error with image ")
      }
    })
  })
})

module.exports = router;
