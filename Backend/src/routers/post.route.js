const express = require("express")
const postController = require('../controllers/post.controller')
const identifyUser = require("../middleware/auth.middleware")

const multer = require('multer')
const { post } = require("../app")
const upload  = multer({storage:multer.memoryStorage()})

const postRouter = express.Router()


postRouter.post('/',upload.single('image'),identifyUser,postController.createPostController)
postRouter.get('/',identifyUser,postController.getPostController)

postRouter.get("/details/:postId",postController.getPostDetailsController)


postRouter.post('/like/:postId',identifyUser,postController.likePostController)




module.exports = postRouter