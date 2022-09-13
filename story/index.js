const Express = require("express");


const StoryController = require("./story.controller")
const router = Express.Router();

router.post("/book",StoryController.book)


module.exports = router;
