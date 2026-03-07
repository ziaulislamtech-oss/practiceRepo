const authRouter = require("../routers/auth.route")

const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken")

async function registerController(req, res) {

    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {

        const errorMessage = isUserAlreadyExist.email === email ? "account already exist with this email" : 'username already exist'
        return res.status(409).json({
            message: errorMessage
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,
    {expiresIn : '1d'}
    )

    res.cookie('token',token)

    res.status(201).json({
        message : 'user registerd successfully'
        user
    })



}

module.exports = { registerController }