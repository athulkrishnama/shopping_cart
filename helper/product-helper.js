var db = require('../config/connection')

module.exports = {
    addProduct: (data, callback) => {
        db.get().collection('products').insertOne(data).then((data) => {
            callback(data.insertedId.toString())
        })
    }
}