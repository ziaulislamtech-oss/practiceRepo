const mongoose  = require("mongoose")

const userScema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, " username is required"],
        unique : [true, 'username already exist']
    },
    password : {
        type : String,
        required : [true,'password is required'],
    },
    email : {
        type : String,
        unique : [true,"with this email user account  already exist"]
    },
    bio : String,
    profileImage : {
        type : String,
        default : 'https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp'
    }
})

const userModel = mongoose.model('users',userScema)

module.exports = userModel