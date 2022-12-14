var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product-helper')
var userHelper = require('../helper/user-helper')

const verifyLogin = (req, res, next) => {
  if (req.session.loggedin) {
    next()
  }
  else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  let cartCount = null
  if (req.session.user) {
    cartCount = await userHelper.cartCount(req.session.user._id)
  } productHelper.getAllProducts().then((products) => {
    res.render('users/view-products', { admin: false, products: products, user: req.session.user, cartCount: cartCount });
  })
});

router.get('/login', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/')
  } else {
    res.render('users/login')
  }
})

router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedin = true
      req.session.user = response.user
      res.redirect('/')
    }
    else {
      res.redirect('/login')
    }
  })
})

router.get('/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/signup', (req, res) => {
  userHelper.doSignin(req.body).then((response) => {
    req.session.loggedin = true
    req.session.user = response
    res.redirect('/login')
  }
  )
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

router.get('/cart', verifyLogin, async (req, res) => {
  let products = await userHelper.getCartProducts(req.session.user._id)
  res.render('users/cart', { user: req.session.user, products: products })
})


router.get('/add-to-cart/:id', (req, res) => {
  console.log('call')
  userHelper.addToCart(req.params.id, req.session.user._id).then(() => {
    // res.redirect('/')
    res.json({status:true})
  })
})
module.exports = router;
