const express = require("express")
// like dotenv cookie parser kite v insert kardo
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")

app.use(express.json())
// used for reading req.body
app.use(cookieParser())   // <-- ADD THIS

app.use(cors({
    origin: true,
    credentials: true
}))

const authRouter = require("./routes/auth.routes")
/* 
using all the routes here
*/
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)
// app.use => middleware

module.exports = app
// used for creating server instance and api and middlewares data