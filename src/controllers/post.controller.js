
const jwt = require('jsonwebtoken')
const IMAGEKIT = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const postModel = require('../Models/post.models')

const imagekit = new IMAGEKIT({
    privateKey: process.env.IMAGE_KIT_PRIVATEKEY,
})

async function createPostController(req, res) {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "un authorised access token not found"
        })
    }
    let decoded
    try {

         decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(401).json({
            message: "user is not authorised token is not from our server"
        })
    }

   const file = await imagekit.files.upload({
    file : await toFile(req.file.buffer,"file"),
    fileName : 'test',
    folder : "test"
   })
    
    console.log(file)

    const post = await postModel.create({
        caption : req.body.caption,
        imgUrl : file.url,
        user : decoded.id
    })

    res.status(201).json({
        message : 'post created successfully',
        post
    })






}

async function getPostController(req,res){

    const token = req.cookies.token 

    if(!token){
        res.status(401).json({
            message : "invalid token or unauthorised user"
        })
    }

    let decoded

    try{
        decoded = await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
    }catch(error){
        res.status(401).json({
            message : 'invalid token'
        })
    }

    const userId = decoded.id

    const posts =  await postModel.find({
        user : userId
    })

    res.status(200).json({
        message : "posts fetched successfully",
        posts
    })



}


module.exports = { createPostController,getPostController }