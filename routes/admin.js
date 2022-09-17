var express = require('express');
const { route } = require('./users');
var router = express.Router();
var productHelper = require('../helper/product-helper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    res.render('admin/view-products',{admin:true, products:products})
  })
  
});


router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  productHelper.addProduct(req.body,async(objId)=>{
    let image = req.files.image
    await image.mv('./public/product-images/' + objId +'.jpg',(err,done)=>{
      if(err){
        console.log("error with image ")
      }
    })
    res.redirect('/admin')
    
  })
})

router.get('/delete-product/:id',(req,res)=>{
  let id = req.params.id
  productHelper.deleteProduct(id).then(()=>{
    res.redirect('/admin')
  })

})

module.exports = router;
