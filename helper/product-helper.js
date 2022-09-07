var db = require('../config/connection')
var collections = require('../config/collections')
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
    }
}