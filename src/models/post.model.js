const mongoose = require("mongoose")

const postScheme = new mongoose.Schema({

    caption : {
        type : String,
        default : ""
    },
    imageUrl : {
        type : String,
        required : [true, "image url is required"]
    },
    user:{
        type : mongoose.Schema.ObjectId,
        ref : "day16User",
        required : [true, "user id is required for creating post"]
    }
})