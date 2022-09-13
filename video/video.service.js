const VideoModel = require("./video.model");

exports.creeateVideo=(data)=>{
    console.log("Data recieved for creating video",data)
    return new Promise(function(resolve,reject){
        data.videoid= Math.floor(100000000 +Math.random() * 900000000)+Date.now();
        console.log(data.videoid)
        var videodata = new VideoModel(data)
        videodata.save().then(function(result){
            console.log("result of mongodb operation",result)
            resolve(result)
        }).catch((error)=>{
            reject()
            console.log("Error in saving video into db" , error)
        })
    })
 
}
exports.findVideos = () =>{
    return new Promise((resolve, reject)=>{
        console.log("here we will find videos from db")
    VideoModel.find({}).then((result)=>{
        console.log("Videos in db are", result)
        resolve(result)
    }).catch((error)=>{
        reject(error)
        console.log("...... error in finding videos from db")
    })
    })
}
exports.getVideoDetails=function(data){

    return new Promise(function(resolve,reject){
  
  
  
      VideoModel.findOne({videoid:data.videoid}).then(function(result){
  
  
  
          console.log("video details", result)
  
  
  
          resolve(result)
  
  
  
  
  
  }).catch((error)=>{
  
  
  
      reject()
  
  
  
      console.log("...... error in finding video from db",error)
  
  
  
      })
  
  
  
  })
  
  }