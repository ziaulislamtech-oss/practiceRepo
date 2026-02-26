const { default: mongoose } = require("mongoose")
const mongooose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const userModel = mongooose.model('userInfo',userSchema)

module.exports = userModel
