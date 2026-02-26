const express  = require('express')
const userModel = require('../Model/user.model')
const jwt = require("jsonwebtoken")

const authRouter = express.Router()


authRouter.post("/register",async (req,res)=>{
    const {name,email,password} = req.body

    const isEmailAlreadyExist  = await  userModel.findOne({email})

    if(isEmailAlreadyExist){

        return res.status(409).json({
            message : "with this email user account already exist"
        })
    }
    const user  = await userModel.create({name, email,password})

    const token = jwt.sign(
        {
            id : user._id,
            email : user.email
        },
        process.env.JWT_SECRET
    )
    
    res.cookie('registerd_key',token)

    res.status(200).json({
        message : 'user registered successfully',
        user,
        token
    })

})

// /api/auth/login 

authRouter.post("/login",async(req,res)=>{

    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message : "with this email user accont doesn't  exist"
        })
    }

    const isPasswordMatched = user.password === password
    
    if(!isPasswordMatched){
        return res.status(401).json({
            message : "invalid password"
        })
    }

    const token = jwt.sign({
        
        id : user._id
    },process.env.JWT_SECRET)

    res.cookie("login_key",token)

    res.status(200).json({
        message : "user loged in successfully",
        user,
        token
    })
})

module.exports = authRouter