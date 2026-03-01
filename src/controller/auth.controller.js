const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

async function registerController(req,res){

    const{name,email,password,bio,profileImage} = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {email},
            {name}
        ]
    })

    if(isUserAlreadyExist){

        const errorMessage  = isUserAlreadyExist.email === email ? "email already exist" : "username already exist"

        res.status(409).json({
            message : errorMessage
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        name,
        email,
        password : hash,
        bio,
        profileImage
    })

    const token = jwt.sign(
        {
            id : user._id,

        },
        process.env.JWT_SECRET,
        {expiresIn : '1d'}
    )

    res.cookie('token',token)

    res.status(200).json({
        message : "user registerd successfully",
        user,
        token
    })
}

async function loginController(req,res){

    const {name,password,email} = req.body
    
    const user = await userModel.findOne({
        $or:[
            {email},
            {name}
        ]
    })

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordMatched = hash === user.password

    if(!isPasswordMatched){
        res.status(401).json({
            message : 'invalid password'
        })
    }

    const token =   jwt.sign(
        {
            id : user._id
        },
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )

    res.cookie('token',token)

    res.status(200).json({
        message : 'user logged In',
        user,
        token
    })


}

module.exports = {
    registerController,
    loginController
}