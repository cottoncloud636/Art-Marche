import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/users.routes.js'; //userRouter is just an alias for "router", so that I can distinguish dsfferent routers
import authRouter from './routes/auth.routes.js'; //same, authRouter is just an alias for "router"
import { verifyToken } from "./utilities/checkUser.js";
import cookieParser from "cookie-parser";
import listingRouter from './routes/listing.routes.js'
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGODB).then( ()=> {
    console.log("Successfully connected to MongoDB");
    }) .catch( (err)=>{
        console.log(err);
    });

//create a dynamic path name, so that the project will be run on other machine
const __dirname = path.resolve();

const app = express();
app.use(express.json()); //by default, we are not allowed to send json directly to server, hence, add this 
                     //so that when testing in postman we can send json to server 

app.use(cookieParser());

app.use('/api/user', userRouter); //whenever sb. goto this endpoint: /api/user, use this "userRouter" route 
                                  //that we created

app.use('/api/auth', authRouter); 

app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client-side/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client-side', 'dist', 'index.html'));
  })

//add middleware to handle various errors
app.use((err, req, res, next) => { //err: the err we send to middle, next: go to next middleware in the stack
                                  //after current middleware finish the op
    const statusCode = err.statusCode || 500; //get the status code caused from the err and save to statusCode
                                        //or if there is no such status code caused from err, then simply use
                                        //the generic error code: 500
    const message = err.message || '500: internal server error'; //except status code, I also want to get the 
                                    //message generated from the error. If there is such msg, save to message
                                    //var, if not, simly show this string after ||.
    return res.status(statusCode).json(
        {
            success: false,
            statusCode, //same as code -- statusCode: statusCode, but since key-value are same name, in ES6, 
                        //I can omit this "duplicate" name
            message,
        }
    );                

});
app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});