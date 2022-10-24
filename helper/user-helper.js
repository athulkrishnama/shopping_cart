var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
const mongo = require('mongodb')
const { promise } = require('bcrypt/promises')
module.exports = {
    doSignin: (userData) => {

        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(userData)
            })
        })
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}

            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            console.log(user)

            if (user) {
                bcrypt.compare(userData.password, user.password).then((result) => {
                    if (result) {
                        loginStatus = true
                        response.user = user
                        response.status = loginStatus
                        resolve(response)
                    }
                    else {
                        resolve(loginStatus)
                    }
                })
            }
            else {
                resolve(loginStatus)
            }
        })


    },
    addToCart: (proId, userId) => {
        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: mongo.ObjectId(userId) })
            if (userCart) {
                db.get().collection(collection.CART_COLLECTION).updateOne({ user: mongo.ObjectId(userId) },
                    {
                        $push: {
                            products: mongo.ObjectId(proId)
                        }
                    }).then(() => {
                        resolve()
                    })
            }
            else {
                let cartObj = {
                    user: mongo.ObjectId(userId),
                    products: [mongo.ObjectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response) => {
                    resolve()
                })
            }
        })
    },
    getCartProducts: (userId) => {
        return new Promise(async(resolve, reject) => {
            let cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate(
                [
                    {$match:{user:mongo.ObjectId(userId)}},
                    {$lookup:{
                        from:collection.PRODUCT_COLLECTION,
                        let:{cartItems:'$products'},
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $in:['$_id',"$$cartItems"]
                                    }
                                }
                            }
                        ],
                        as:'cartList'
                    }}
                ]
            ).toArray()
            resolve(cartItems[0].cartList)
        })
    },
    cartCount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count = 0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({user:mongo.ObjectId(userId)})
            if(cart){
                count = cart.products.length
            }
            resolve(count)
        })
    }
}