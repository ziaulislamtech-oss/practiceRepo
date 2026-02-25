const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : [true , " with this emaile user acccount already exist"]
    },
    password : String
})

const userModel =mongoose.model("userProfile", userSchema)
module.exports = userModel
