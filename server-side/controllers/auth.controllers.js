import User from '../models/users.model.js';
import bcryptjs from 'bcryptjs';

export const register = async (req, res)=>{
    // console.log(req.body); -- for postman test purpose, to see if the form data successfully send to backend
    // save user form input into DB
    const {userName, email, password} =  req.body;//get user form input from the req body and destructured them 
    const pswhashed = bcryptjs.hashSync(password, 10);//hashSync already contains await feature, 10 is # of salt round
    const newUser = new User({userName, email, password: pswhashed});

    //try to save this newUser info, if successful, show success msg, else show error msg.
    try{
        await newUser.save();
        res.status(201).json("user is registered successfully"); //201: Created success status
    } catch (error){
        res.status(500).json(error.message);//500: a generic error status code. Will generate the internal 
                                            //error msg to concole
    }
};



//purpose of await -- the save action takes some time to get affect, hence use async tell JS don't wait for this
//line to complete, just move on to the next op while waiting.