import { errorHandler } from "./customizederrors.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.userCredential_token; //retrieves the token value from the cookies present in the incoming
                                    // request (req).
    if (!token) return next(errorHandler(401, 'Unauthorized user')); //if token can't be found in the
                            //incoming request, then no such user exist401 unauthorized code

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{//else if such token exist, verify this token's credential
                                //If the verification succeeds, the decoded information from the token 
                                //payload is accessible within the user variable.
        if (err) return next(errorHandler(403, 'Server refuse to access')); //403: server understands the request but refuses to authorize it.
        req.user = user;//Upon successful verification, the decoded user information obtained from the 
                        //JWT payload is assigned to req.user. This is a common practice in middleware 
                        //to attach additional information to the req object for use in subsequent 
                        //middleware functions or route handlers.
        next();
    });

};
//get token from the cookie we created earlier from the event of user logged in