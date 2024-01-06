import Listing from '../models/listing.model.js';
import { errorHandler } from '../utilities/customizederrors.js';

export const createList = async (req, res, next)=>{
    try {
        const listing = await Listing.create(req.body);//Listing is model name from listing.model.js
                //create is part of a ORM (Object-Relational Mapping) or ODM (Object-Document Mapping) library 
                        //like Mongoose in Node.js, as it's commonly used to create documents in MongoDB.
        return res.status(201).json(listing);//created the listing in previous code and here I send back
                                             //this listing to the user. 201: Created success
    } catch (error) {
        next(error);
    }
};

export const deleteList = async (req, res, next)=>{
    const listToBeDelete = await Listing.findById(req.params.id);//use the id in params to find the list in 
                                      //Listing model to see if this list exist
    
    //check if this list exist
    if(!listToBeDelete){
        return next(errorHandler(404, 'The list you are trying to delete does not exist in our database'));
    } 
    //check if the user is authorized to delete this list
    if (req.user.id !== listToBeDelete.userRef){ //check if the user id in the session is same as the userRef who created this list
        return next(errorHandler(401, 'You are not authorized to delete this list.'));
    }
    //in try and catch block, we perform the delete operation
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('List was deleted successfully.')
    } catch (error) {
        next(error);
    }
};
