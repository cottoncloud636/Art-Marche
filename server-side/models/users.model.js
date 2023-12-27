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
    },
    picture: {
        type: String,
        default:  'https://th.bing.com/th/id/R.5d577bb5dfe4bec0a587d635ceee4a90?rik=BCXDzDNkGj8B0w&pid=ImgRaw&r=0',
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