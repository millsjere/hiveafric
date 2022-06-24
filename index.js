const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const crypto = require('crypto')

const userRouter = require('./routers/userRouter')

 
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
app.use(userRouter)

// Static Files //


// Connect to DB //
const db = process.env.DATABASE;
const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected..."))
    .catch((err) =>{
      if(err){
        console.log("Database unable to connect please check your internet connection")
      }
    });
};

// Start Server //
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    connectDB()
    console.log(`Server is running on ${PORT}`)
})
