const app = require('./src/app.js')
const connectToDb = require("./src/config/database.js")
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
connectToDb()