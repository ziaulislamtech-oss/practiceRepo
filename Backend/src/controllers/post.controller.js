
const jwt = require('jsonwebtoken')
const IMAGEKIT = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const postModel = require('../Models/post.models')
const likeModel = require('../Models/like.model')

const imagekit = new IMAGEKIT({
    privateKey: process.env.IMAGE_KIT_PRIVATEKEY,
})

async function createPostController(req, res) {

   

   const file = await imagekit.files.upload({
    file : await toFile(req.file.buffer,"file"),
    fileName : 'test',
    folder : "test"
   })
    
    console.log(file)

    const post = await postModel.create({
        caption : req.body.caption,
        imgUrl : file.url,
        user : req.user.id
    })

    res.status(201).json({
        message : 'post created successfully',
        post
    })






}

async function getPostController(req,res){

    const userId = req.user.id

    const posts =  await postModel.find({
        user : userId
    })

    res.status(200).json({
        message : "posts fetched successfully",
        posts
    })



}

async function getPostDetailsController(req,res){


    const postId = req.params.postId
    const userId = req.user.id
    
    const post = await postModel.findById(postId)

    if(!post){
        res.status(404).json({
            message : "post not found"
        })
    }

    console.log(post,userId)
    const isValidUser = post.user.toString() === userId


    if(!isValidUser){
        return res.status(403).json({
            message : "Forbidden access"
        })
    }

    res.status(200).json({
        message : 'post fetched successfully',
        post
    })
    

   

}

async function likePostController(req,res){

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message : 'post not found'
        })
    }
    
    const like = await likeModel.create({
        post : postId,
        user : username
    })

    res.status(201).json({
        message : 'post liked successfully',
        like
    })

}

module.exports = { createPostController,getPostController , getPostDetailsController,likePostController }