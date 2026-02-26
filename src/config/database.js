const mongooose  = require("mongoose")

function connectToDb(){
    mongooose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Database Connect')
    })
}

module.exports = connectToDb