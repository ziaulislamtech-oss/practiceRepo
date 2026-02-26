const express = require("express")
const userModel = require("./Model/user.model")
const app = express()
const cookieParser = require("cookie-parser")
const authRouter = require("./routers/auth.route")

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)





module.exports = app