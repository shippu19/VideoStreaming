const Express = require("express");
var jwt = require('jsonwebtoken');

const UserController = require("./user.controller")
const router = Express.Router();

router.post("/register",UserController.sandesh)
router.post("/login",UserController.login)
router.get("/search",UserController.search)
router.post("/upload",UserController.uploadProfileImage)
router.delete("/deleteaccount",function(req,res,next){
    var token= req.get("Authorization")
    try{
        var payload =jwt.verify(token,"mysecretkey")
    }
    catch{
        console.log("token is not valid")
        res.status(401).send()
    }
    if(payload){
        next()
    }
   
    console.log("token verification result: ",payload)
},UserController.deleteAccount)
router.put("/updateprofile",function(req,res,next){
    var token= req.get("Authorization")
    try{
        var payload =jwt.verify(token,"mysecretkey")
    }
    catch{
        console.log("token is not valid")
        res.status(401).send()
    }
    if(payload){
        req.body.email = payload.email
        next()
    }
   
    console.log("token verification result: ",payload)
},UserController.updateProfile)

router.post("/forgotpassword",UserController.forgot)

router.get("/loggedin",function(req,res){
    var token= req.get("Authorization")
    try{
        var payload =jwt.verify(token,"mysecretkey")
        if(payload){
            // req.body.verified = payload.
            res.status(200).send("Verified")
    
        }

    }
    catch{
        console.log("token is not valid")
        res.status(500).send()
    }
   
   
    console.log("token verification result: ",payload)
})

module.exports = router;
