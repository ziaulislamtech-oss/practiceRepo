const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const bcrypt = require("bcrypt");

async function registerController(req, res) {

    const { name, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { name },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        const errorMessage = isUserAlreadyExist.email === email ? 'email already exist' : 'username already exist'

        return res.status(409).json({
            message: errorMessage
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        name,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: 'user registers successfully',
        user,
        token
    })




}

async function loginController(req, res) {

    const { name, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { name },
            { email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: 'user not found'
        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return  res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    )

    res.cookie('jwt_token',token)

    res.status(200).json({
        message : 'user logged in',
        user,
        token
    })

}

module.exports = {
    registerController,
    loginController
}