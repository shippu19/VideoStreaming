const Mongoose = require("mongoose")
const VideoSchema = new Mongoose.Schema({
    url:{type:String, unique:true,required:true},
    cover:{type:String},
    thumbnail:{type:String,required:true},
    title:{type:String, unique:true,required:true},
    verified:{type:Boolean,default:false},
    genre:{type:[String]},
    yearofrelease:{type:Date},
    creationdate:{type:Date,default:new Date()},
    language:{type:[String]},
    videoid:{type:Number,unique:true,required:true},
    rating:{type:Number,default:9},
    description:{type:String},
    owner:{type:String},
    cast:{type:[String]}
})

const VideoModel = Mongoose.model("video",VideoSchema) // users is a collection in db where all the data's of this module will be stored
module.exports= VideoModel;