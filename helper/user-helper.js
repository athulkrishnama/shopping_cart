var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
module.exports = {
    doSignin: (userData)=>{
        
       return new Promise(async(resolve,reject)=>{
        userData.password =await bcrypt.hash(userData.password,10)
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data)
        })
       })
    },

    doLogin: (userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false
            let response = {}

            let user = await db.get().collection(collection.USER_COLLECTION).findOne({email: userData.email})
            console.log(user)

            if(user){
                bcrypt.compare(userData.password, user.password).then((result)=>{
                    if(result){
                        loginStatus = true
                        response.user = user
                        response.status = loginStatus
                        resolve(response)
                    }
                    else{
                        resolve(loginStatus)
                    }
                })
            }
            else{
                resolve(loginStatus)
            }
        })


    }
}