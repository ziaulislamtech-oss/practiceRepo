// const IMAGEKIT = require("@imagekit/nodejs")
// const {toFile} = require("@imagekit/nodejs")

// const imageKit = new IMAGEKIT({
    
//     privateKey : process.env.ImageKit_Private_key
// })

// async function createPost(req, res) {

//     console.log(req.body,req.file)

//     const file = await imageKit.files.upload({
//         file : await toFile(Buffer.from(req.file.buffer),'file'),
//         fileName : 'test'
//     })

//     res.send(file)
// }

// module.exports = {
//     createPost
// }

const IMAGEKIT = require('@imagekit/nodejs')
const {toFile} = require("@imagekit/nodejs")

const imageKit = new IMAGEKIT({
    privateKey : process.env.ImageKit_Private_key
})

async function createPost(req,res){

    console.log(req.body,req.file)

    const file = await imageKit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),req.file.orignalName),
        fileName : 'test'
    })

    res.send(file)

}

module.exports = {createPost}