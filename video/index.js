const Express = require("express");


const router = Express.Router();
const VideoController=require("./video.controller")
router.post("/addvideo",VideoController.createVideo)
router.get("/browse",VideoController.getVideo)
router.get("/getvideodetails/:videoid",VideoController.getvideoDetails)
module.exports = router;
