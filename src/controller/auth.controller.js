const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")



async function registerController(req, res) {

    const { name, password, email, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({

        $or: [
            { name },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: (isUserAlreadyExist.email) ? ' email already exist' : 'username already exist'
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest('hex')

    const user = await userModel.create({
        name,
        email,
        bio,
        profileImage,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie('token', token)


    res.status(201).json({
        message : 'user register successfully',
        user 
    })
}

module.exports = {
    registerController
}