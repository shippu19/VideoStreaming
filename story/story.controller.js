const StoryService = require("./story.service")
exports.book = function(req,res){
    StoryService.createUser(req.body).then(function(result){
        res.send({message:"User Created"})
    },function(error){
        if(error){
            res.status(409).send({
                message:"User already exists"
            })
        }
        else{
        res.status(500).send()
        }
        
    })

}