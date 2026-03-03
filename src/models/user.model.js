const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : [true,'name already exist'],
        required : [true, 'name is required']
    },
    email : {
        type : String,
        unique : [true,"with this email user account already exist"],
        required : [true,'email is required']
    },
    password : {
        type : String,
        required : [true,'password is require'],
    },
    bio : String,
    profileImage : {
        type : String,
        default : 'https://ik.imagekit.io/18kjj0yy3/default_user_profile_image.webp'
    },
})

const userModel = mongoose.model("day16User",userSchema)

module.exports = userModel