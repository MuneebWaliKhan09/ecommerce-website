const express = require('express');
const cors = require("cors");
const connect = require("./config/db")
require("colors")
const dotenv = require("dotenv")
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");

app.use(cors(
    {
        origin: "https://ecommerce-muneeb-frontend.vercel.app",
        // methods: ["POST", "GET"],
        // credentials: true,
    }
));

// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`.red)
    console.log(`Shutting down the server due to uncaught exception `)
    process.exit(1)
})


// config dotenv
dotenv.config({ path: ".env" })

connect()


app.use(express.json())
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(cors())


// upload images
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});



const user = require("./routes/userRoutes")
const product = require("./routes/productRoutes")
const order = require("./routes/orderRoutes")
const payment = require("./routes/PaymentRoute")


app.use('/api', user)
app.use('/api', product)
app.use('/api', order)
app.use("/api", payment)




// Global error handler middleware
app.use((err, req, res, next) => {
    // console.error(err.stack);

    // Handle specific error types (e.g., ReferenceError, SyntaxError, etc.) if needed
    if (err instanceof ReferenceError) {
        res.status(400).json({ msg: 'ReferenceError occurred', err: err.stack });
    }
});



const server = app.listen(process.env.PORT, () => { console.log(`server started on port http://:${process.env.PORT || 5000}`.cyan) })


// unhandle promise rejection server rejection database rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`.red)
    console.log(`Shutting down the server due to unhandled promise rejection `)

    server.close(() => {
        process.exit(1)
    })
})


// {
//     "version":2,
//     "builds": [
//       { "src": "*.js", "use": "@vercel/node" }
//     ],
//     "routes": [
//         {
//           "src": "/(.*)",
//           "dest": "/"
//         }
//     ]
//   }