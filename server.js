const Express = require("express");
const path = require('path');
const cors = require('cors');
const Mongoose = require("mongoose");
const dburl ="mongodb://localhost:27017/brilliodb1" //using for user 
// const dburl1 ="mongodb://localhost:27017/story" //using for user 
const server = Express();

const Port = 9800;
const fs = require('fs');

server.use(Express.json()); // middleware for json 
server.use(Express.static(path.resolve(__dirname,"./build")))
const corsOptions ={

    exposedHeaders:"Authorization",

}
server.use(cors(corsOptions));

server.use('/user',require("./user"))
server.use('/story',require("./story"))
server.use('/video',require("./video"))


server.listen(Port,function(){ // here the function is a callback function 
    Mongoose.connect(dburl,function(error,client){
        if(error){
        console.log("Error in connecting to database",error)
        }
        else{
            console.log("Connected to database");
        }
    })
    console.log("Port is listening ",Port);
})



