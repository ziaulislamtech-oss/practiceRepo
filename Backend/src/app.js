const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require('cors')



// routerss
const authRouter = require('./routers/auth.route')
const postRouter = require('./routers/post.route')
const userRouter = require('./routers/user.route')


const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials : true,
    origin : 'http://localhost:5173'
}))

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use('/api/user',userRouter)

module.exports = app