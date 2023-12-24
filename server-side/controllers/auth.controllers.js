import User from '../models/users.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utilities/customizederrors.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next)=>{ //add next so that we can use middleware
    // console.log(req.body); -- for postman test purpose, to see if the form data successfully send to backend
    // save user form input into DB
    const {userName, email, password} =  req.body;//get user form input from the req body and destructured them 
    const pswhashed = bcryptjs.hashSync(password, 10);//hashSync already contains await feature, 10 is # of salt round
    const newUser = new User({userName, email, password: pswhashed});

    //try to save this newUser info, if successful, show success msg, else show error msg.
    try{
        await newUser.save(); //purpose of await -- the save action takes some time to get affect, hence use 
        //async tell JS don't wait for this line to complete, just move on to the next op while waiting.
        res.status(201).json('user is registered successfully'); //201: Created success status
    } catch (error){
        // res.status(500).json(error.message); -- //500: a generic error status code. Will generate the internal 
                                            //error msg to concole
                                            // -- this code is replaced by middleware below
        next(error); //this is the system error using middleware, is replaced by customized error below if we 
                     //want to customize error
        //next (errorHandler(550, 'this is my customized error')); --status codes typically range from 100 to 599
                                        //I used 10000 initially which is not a valid HTTP status code
                                        //-- I can use it when I want to customized error
    }
};

export const login =  async (req, res, next)=>{
    const {userName, password} =  req.body; //use userName and password these two to authenticate "old" users
    //1. check if userName exist in DB
    try{
        const existingUserName = await User.findOne({userName}); //user User model to find username
             //findOne method is used to query DB to find a single document that matches the specified criteria.
        if (!existingUserName) //if no such user found in DB, display customized error using errorHandler that I 
                        //created in "folder-utilities --> customizederrors.js" thru middleware by saying "next"
            return next(errorHandler(404, 'User name can not be found.'));
             //else if user name does exist, then check psw. Since psw is hashed by bcrypt, I need to use 
             //built-in bcrypt method to compare the hashed psw 
        const validPsw = bcryptjs.compareSync(password, existingUserName.password); //former "password" is 
                                              //the psw we got it from user inputted just now, latter "password"
                                              //is from DB which we retrieve by using existingUserName
        if (!validPsw) return next(errorHandler(401, 'Credential does not match our records.'));//401:
                                                               // Unauthorized response status code indicates 
                                                               //that client request has not been completed 
                                                               //because it lacks valid authentication 
                                                               //credentials for the requested resource.
        //else if psw is valid, then create a cookie (doing so by creating a token using jwt)
        const token = jwt.sign({id: existingUserName._id}, process.env.JWT_SECRET); //use jsonwebtoken library to
                                                                                   // sign and verify tokens
                                            //sign() function used to generate a new jsonwebtoken based on the
                                            //provided payload and a secret key
                                            //add a secret key to make the token unique
                                            //since secret is hashed, I need to pass in env var instead of directly
                                            //pass the 'secret' in here.
        //separate password info from the rest of the info:
        const {password: psw, ...restInfo} = existingUserName._doc;
        res.cookie('userCredential_token', token, {httpOnly:true}).status(200).json(restInfo);//save token to cookie. 
            //optional to add other creteria for this token, S.A. no other party can use this token except this 
            //http; how long (a session) do I want to keep this cookie etc.
                     
    } catch(error){
        next(error);
    }
};
