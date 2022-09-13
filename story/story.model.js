const Mongoose = require("mongoose")
const StorySchema = new Mongoose.Schema({
    title:{type:String, unique:true,required:true},
    writer:{type:String,required:true},
    summary:{type:String},

})

const StoryModel = Mongoose.model("story",StorySchema) // users is a collection in db where all the data's of this module will be stored
module.exports= StoryModel;