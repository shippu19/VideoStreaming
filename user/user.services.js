const UserModel = require("./user.module")
const EventEmitter = require("events")

exports.createUser = function(data){


 return new Promise(function(resolve,reject){
    data.email= data.email.toLowerCase();
   var userdata = UserModel(data) // data is validated in UserModel and sends back the response . i.e passed or rejected
     
   userdata.save().then(function(result){
        console.log("result of mongodb operation",result)
        resolve(result);
    },
    function(error){ //error returned by mongodb 
        console.log("Error in saving user to database",error)
        if(error.code == 11000){
            reject(error);
        }
        reject();
    })
 })
}
exports.findUser = function(data){
    return new Promise(function(resolve,reject){
 var queryObj ={ 
     email:data.email.toLowerCase(),
     password: data.password

 }
 UserModel.findOne(queryObj).then(function(result){
     console.log("Finding user from db",result)
     if(result){
         resolve(result)
     }
     else{
         reject("Invalid Creds")
     }
 }).catch(function(error){
     reject()
     console.log("error in finding db user")
 })
})
}



// exports.forgotPassword = function(data){

// var queryObj = {
// email : data.email.toLowerCase()

//  }
 
 
 
//  return new Promise(function(resolve,reject){
 
//  UserModel.findOne(queryObj).then(function(result){
 
//  console.log("Finding user from db", result)
//  console.log("Password recovered successfully:",result.password)
 
//  if(result){

//  resolve(result)
 
//   } 
//  else
//   reject("Invalid Credentials")

//  }).catch(function(error){
 
//  reject()
 
//  console.log("Error in finding user from db",error)
// })
// })
//  }

// exports.deleteUser = function(data){
//     return new Promise(function(resolve,reject){
//     })
//   }

 exports.forgotPassword = (data)=>{
    let emitter = new EventEmitter()
    console.log("Here we are finding password of user")
    var queryObj = {email:data.email}
    UserModel.findOne(queryObj).then((result)=>{
        console.log("result of db operation", result)
        if(result){
            return emitter.emit("MIl_GAYA" , result)
        }
        else{
            return emitter.emit("NOT_FOUND")
        }
    }).catch((error)=>{
        console.log(error)
        return emitter.emit("ERROR")
    })

    return emitter
}

exports.findUsers = (data) =>{
    return new Promise((resolve, reject)=>{
        console.log("here we will find users from db")
        var query = {"email":{"$regex":data.q, "$options":"i"}}
    UserModel.find(query).then((result)=>{
        console.log("users in db are", result)
        resolve(result)
    }).catch((error)=>{
        reject()
        console.log("...... error in finding users from db")
    })
    })
}
exports.updateProfile = (data,cb)=>{
    var queryObj={
        email:data.email
    }
    var updateObject ={
        "$set" :{
            image:data.image,
            name:data.name,
            profilecompleted:true
        }
    }
    console.log("....... before passing to db" , queryObj,updateObject)
    UserModel.findOneAndUpdate(queryObj,updateObject).then((result) => {
        console.log("Result of update user from db: ", result);
        cb(null, result);    
      }).catch((error) => {
        console.log("Error in update user from db: ", error);
        cb(error, null);
      })
}





