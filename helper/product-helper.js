var db = require('../config/connection')
var collections = require('../config/collections')
const { promise } = require('bcrypt/promises')
var mongodb = require('mongodb')
module.exports = {
    addProduct: (data, callback) => {
        db.get().collection(collections.PRODUCT_COLLECTION).insertOne(data).then((data) => {
            callback(data.insertedId.toString())
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products = await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(id=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).deleteOne({_id:mongodb.ObjectId(id)})
            resolve()
        })
    })
}