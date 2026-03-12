const followModel = require('../Models/follow.model')
const userModel = require('../Models/user.model')

async function followUserController(req,res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

     if(followerUsername===followeeUsername){
       return res.status(400).json({
            message : "you cannot follow yourself"
        })
    } 

     const isFolloweeExist = await userModel.findOne({
        username : followeeUsername
    })
    if(!isFolloweeExist){

        return res.status(404).json({
            message  : "followee does not exist"
        })
    }

     const isAlreadyFollowing = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message : `you are already following the ${followeeUsername}`,
            follow : isAlreadyFollowing 
        })
    }

    const followRecord = await followModel.create({
        follower : followerUsername,
        followee : followeeUsername
    })

   

    res.status(201).json({
        message : `you are now following ${followeeUsername}`,
        follow : followRecord
    })
}

async function unfollowUserController(req,res){

    const followerUsername =  req.user.username;
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    })
    console.log(isUserFollowing)

    if(!isUserFollowing){
        return res.status(200).json({
            message : `you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)
    res.status(200).json({
        message : `you have unfollowed ${followeeUsername}`
    })
}

async function handleRequestController(req,res){


    const {status} = req.body
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isRequestRecieved = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    })

    if(!isRequestRecieved){
        console.log('request not found')
        return res.status(403).json({
            message : "you are not the owner of this request"
    })
    }
    
    const statusText = status ===   'accepted'  ? 'accepted' : 'rejected'
    isRequestRecieved.status = statusText
    await isRequestRecieved.save()
    res.status(200).json({
        message : `you ${statusText} ${followeeUsername}`,
        isRequestRecieved

    })
}

module.exports = {followUserController,unfollowUserController,handleRequestController}