const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        unique : [true,'username already exist'],
        require: [true , "username is required"]
    },

    email : {
        type : String,
        unique : [true, "with this email user account already exist"],
        require : [true, "email is required"]
    },
    password : {
        type : String,
        require : [true, 'password is required']
    },
    bio : String,

    profileImage : {
        type  : String,
        default : "https://ik.imagekit.io/18kjj0yy3/default_user_profile_image.webp"
    }
})

const userModel = mongoose.model("userProfile", userSchema)

module.exports = userModel