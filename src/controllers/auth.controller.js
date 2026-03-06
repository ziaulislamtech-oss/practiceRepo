const userModel = require("../Models/user.model")
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
        const errorMessage = isUserAlreadyExist.email === email ? "email already exist" : "username already exist"
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
        { expiresIn: '1d' }
    )

    res.cookie('token', token)

    res.status(201).json({
        message: "user created successfully",
        user
    })
}

async function loginController(req, res) {

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (!user) {
        res.status(404).json({
            message: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if (!isPasswordValid) {
        res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token",token)

    res.status(200).json({
        message : "logged in successfully",
        user
    })
}


module.exports = { registerController,loginController }