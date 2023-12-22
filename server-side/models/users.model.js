import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    userName: {
        type: String,
        unique : true,
        required: true, 
    },
    email: {
        type: String,
        unique : true,
        required: true, 
    },
    password: {
        type: String,
        unique : true,
        // required: true -- no need this, because multiple users can have multiple same psw they want to
    }
}, 
//besides that, timestamps info is very useful, will record time of user account created and updated, which is
//useful for searching user account in the future
{
    timestamps : true
}
);
const User = mongoose.model('User', userSchema); //create a model called "User", serve as an interface to DB
export default User;