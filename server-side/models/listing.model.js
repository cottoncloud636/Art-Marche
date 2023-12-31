import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    listingName:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    artMedium: {
        type: String,
        required: true,
    },
    origin:{
        type: String,
        required: true,
    }, 
    paintUrls:{
        type: Array, //type is array because user are allowed to upload multiple photos and I can display
                     //multiple photos too
        required: true,
    },
    userRef:{  //this refer to the user who upload this paint
        type: String,
        required: true,
    },
}, 
{
    timestamps: true
}
);

const Listing = mongoose.model('Listing', listingSchema); //create a model called "User", serve as an interface to DB
export default Listing;