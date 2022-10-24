var mongoClient = require('mongodb').MongoClient
state = {
    db:null
}
module.exports.connection = (done)=>{
 const url = 'mongodb://0.0.0.0:27017'
 const dbname = 'shoppingcart'
 
 mongoClient.connect(url,(err,data)=>{
    if(err){
        console.log(err)
       return done(err)
    }
    state.db = data.db(dbname)
    done()
 })
}

module.exports.get = ()=>{
    return state.db
}