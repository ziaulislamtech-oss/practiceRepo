const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : [true,"user name already exist"],
        required : [true,"username is required"]
    },
    email : {
        type : String,
        unique : [true,"user account already exist with this email"],
        required : [true,"email is required"]
    },
    password : {
        type :  String,
        required : [true,"password is required"]
    },
    bio : String,
    profileImage : {
        type : String,
        default : "https://ik.imagekit.io/18kjj0yy3/default_user_profile_image.webp"
    }

})

const userModel = mongoose.model('day15User',userSchema)

module.exports  = userModel