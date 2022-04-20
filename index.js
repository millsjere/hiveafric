const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser');


//Parsers //
app.enable('trust proxy');
app.use(cors({
    origin: ["https://hiveafric.com", "https://connect.hiveafric.com"],
    credentials: true,
}));
app.options('*', cors());
app.use(helmet());
app.use(express.json());
dotenv.config({ path: './config.env' });
app.use(cookieParser());



// All Routes default //


// Static Files //


// Connect to DB //


// Start Server //
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})
