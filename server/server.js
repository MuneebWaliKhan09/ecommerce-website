const express = require('express');
const cors = require('cors');
const connect = require("./config/db")
require("colors")
require("dotenv").config()
const app = express();
const cookieParser  = require("cookie-parser");

const port = 8009

connect()


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors())





app.listen(()=> console.log(`server is running on port ${port} `.cyan.bold.underline))
