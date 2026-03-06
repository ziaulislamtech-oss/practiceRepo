const express = require('express')
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")


authRouter.post('/register',authController.registerController)

// authRouter.post('/login')

module.exports = authRouter
