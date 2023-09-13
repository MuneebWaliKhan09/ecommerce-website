const express = require('express');
const cors = require('cors');
const connect = require("./config/db")
require("colors")
require("dotenv").config()
const app = express();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000; // Use 5000 as a default if PORT is not set in .env


// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.stack}`.red)
    console.log(`Shutting down the server due to uncaught exception `)
    process.exit(1)
})

connect()


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors())






const user = require("./routes/userRoutes")

app.use('/api', user)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.cyan.bold.underline);
});


// unhandle promise rejection server rejection database rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`.red)
    console.log(`Shutting down the server due to unhandled promise rejection `)

    server.close(() => {
        process.exit(1)
    })
})