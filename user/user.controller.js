const UserService = require("./user.services")
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const CommonService = require('./commonservice')
const Upload = require('./uploadimages')


const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage }).single('file')

exports.sandesh = function(req,res){
    UserService.createUser(req.body).then(function(result){
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
exports.login = function(req,res){
    UserService.findUser(req.body).then(function(result){
        
        var payload={
            email:req.body.email.toLowerCase()
        }

        console.log('response from backend...',result)
        var token = jwt.sign(payload,"mysecretkey");
        res.setHeader("Authorization",token)
         res.send({message:"Login Successful",
         user: result })
         //
         
    },function(error){
        if(error){
            res.status(500).send({
                message:"Invalid Creds"
            })
        }
        else{
        res.status(500).send()
        }
        
    })

}
exports.deleteAccount = function(req,res){
    
}

// exports.forgot = function(req,res){

//     UserService.forgotPassword(req.body).then(function(){f

//       var payload = {
//         email:req.body.email.toLowerCase()
//       }
//       res.send({
//         message:"Password  Recovered Successfully"
//       })
//     //   nodemailer.mailer()
//     let transporter = nodemailer.createTransport({
//         host: "smtp-mail.outlook.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: "shippubhushan@brillio.com", // generated ethereal user
//           pass: "shi!!ppuuser2022", // generated ethereal password
//         },
//         tls: {

//             rejectUnauthorized: false,
  
//           },
//       });
    
//       // send mail with defined transport object
//       let info = transporter.sendMail({
//         from: "shippubhushan@brillio.com" , // sender address
//         to: "shippubhushanformal@gmail.com", // list of receivers
//         subject: "Password Recovered successfully ", // Subject line
//         text: "Password", // plain text body
//         html: `<h1Password: ${res.password}h1>`, // html body
//       });
//       transporter.sendMail(info,function(error){
//           if(error){
//               console.log(error);
//           }
//           else{
//               console.log("Email sennt")
//           }
//       })
//     }, function(error){
//       if(error){
//         res.status(500).send({
//           message:"Invalid Credentials"
//         }) 
//       }
//       else{
//         res.status(500).send()
//       }
//     })
//   }

exports.forgot = (req,res)=>{
    UserService.forgotPassword(req.body)
    .once("NOT_FOUND", function(){
        res.status(500).send({
            message:"No Such Email Exists"
        })
    })
    .once("MIl_GAYA", function(result){
        CommonService.mail(req.body.email,result.password).then(()=>{
            res.send({
                message:"Password Sent to your Email"
            })
        }).catch((error)=>{
            console.log(".... error coming in controller " , error)
            res.status(500).send({message:"Some different error occured"})
        })
    })
    .once("ERROR", (error)=>
    {
        console.log(error)
        res.status(500).send({message:"Technical error"})
    })
}

exports.search=(req,res)=>{

    console.log("query is", req.query)

    UserService.findUsers(req.query).then((result)=>{

        res.send({

            users:[result]

        })

    }).catch(function(){

        res.status(500)

    })

}
exports.uploadProfileImage=(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.sendStatus(500);
        }
        res.send(req.file)
        console.log(req.file)
        // Upload.uploadFile(req.file.filename)
    })
   
}
exports.updateProfile = (req, res) => {
    UserService.updateProfile(req.body, (error, data) => {
      if (error) {
        res.status(500).send({
          message: "Could not update Profile"
        })
      } else {
        res.status(204).send({
          user: data
        })
      }
    })
  
  
  
  }
