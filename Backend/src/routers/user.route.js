const express = require('express')
const userController = require("../controllers/user.controller")
const identifyUser = require('../middleware/auth.middleware')

const userRouter = express.Router()

/*
* @route POST /api/users/follow/:userid
* @description Follow a user 
* @access Private
*/


userRouter.post("/follow/:username",identifyUser,userController.followUserController)


// unfollow
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)


// status 
userRouter.post('/status/:username',identifyUser,userController.handleRequestController)

module.exports = userRouter