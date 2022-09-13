const StoryModel = require("./story.model")
exports.createUser = function(data){


    return new Promise(function(resolve,reject){
       data.title= data.title.toLowerCase();
      var storydata = StoryModel(data) // data is validated in UserModel and sends back the response . i.e passed or rejected
        
      storydata.save().then(function(result){
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