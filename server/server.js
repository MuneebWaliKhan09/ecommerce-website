const express = require('express');
const cors = require('cors');
const connect = require("./config/db")
require("colors")
require("dotenv").config()
const app = express();
const cookieParser = require("cookie-parser");



// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`.red)
    console.log(`Shutting down the server due to uncaught exception `)
    process.exit(1)
})

connect()


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors())








app.listen(() => console.log(`server is running on port ${process.env.PORT} `.cyan.bold.underline))


const user = require("./routes/userRoutes")

app.use('/api', user)

// unhandle promise rejection server rejection database rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`.red)
    console.log(`Shutting down the server due to unhandled promise rejection `)

    server.close(() => {
        process.exit(1)
    })
})