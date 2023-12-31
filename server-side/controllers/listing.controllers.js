import Listing from '../models/listing.model.js';

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
}