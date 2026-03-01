// require('.env).config()
require('dotenv').config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is connected on ${PORT} port`)
})
connectToDb()