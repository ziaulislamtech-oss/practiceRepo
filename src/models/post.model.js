const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default : "",
    },
    imgUrl : {
        type : String,
        required : [true,"image is required"]
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "day15User",
        required : [true, "user id is required for creating a post"]
    }
})