const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : [true, " user already exist with this email address"],
    },
    password : String
})

const userModel = mongoose.model('userLogins',userSchema)
module.exports = userModel