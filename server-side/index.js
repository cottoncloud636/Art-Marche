import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/users.routes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB).then( ()=> {
    console.log("Successfully connected to MongoDB");
    }) .catch( (err)=>{
        console.log(err);
    });

const app = express();

app.use('/api/user', userRouter); //whenever sb. goto this endpoint: /api/user, use this "userRouter" route 
                                  //that we created



app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});