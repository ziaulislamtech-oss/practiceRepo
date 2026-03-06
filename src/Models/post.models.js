const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    
    caption : {
        type : String,
    },
    imgUrl : {
        type : String,
        required : [true,'image url is required to create post'],

    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'users',
        require : [true,'user id is required for creating post']
    }
})

const postModel = mongoose.model('posts',postSchema)

module.exports = postModel