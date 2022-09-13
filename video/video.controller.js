const VideoService = require('./video.service')

exports.createVideo = function(req,res){
    VideoService.creeateVideo(req.body).then(function(result){
        res.send({message:"Video Uploaded"})
    },function(error){
        if(error){
            res.status(409).send({
                message:"Video already exists"
            })
        }
        else{
        res.status(500).send()
        }
        
    })

}
exports.getVideo=(req,res)=>{

    console.log("query is", req)

    VideoService.findVideos().then((result)=>{

        res.send({

            videos:result

        })

    }).catch(function(){

        res.status(500)

    })

}

exports.getvideoDetails=(req,res)=>

VideoService.getVideoDetails(req.params).then(
  function (result) {
    res.send({
      message: "video retrieved",
      response:result
    });
    console.log(result.name);
  },
  function (error) {
      res.status(500).send();
    console.log("No videos in db");
  }
);