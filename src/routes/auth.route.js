const  express = require("express")
const userModel = require("../model/note.model")
const { response } = require("../app")

const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    const {email, password , name} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(400).json({
            message : "user already exist with this email address"
        })
    }

    const user = await  userModel.create({
        email,name,password
    })


    
    res.status(201).json({
        message : 'user create successfully'
    })
})

module.exports = authRouter