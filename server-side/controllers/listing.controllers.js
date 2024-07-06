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

export const updateArtList = async (req, res, next)=>{
    //1. check if list exist
    const listToBeUpdate = await Listing.findById(req.params.id);
    if (!listToBeUpdate) return next(errorHandler(404,'The list you are trying to update does not exist in our database' ));
    //2. and check if user is authoeized to edit this list. By comparing the id in session vs userRef which
    //   represent the user who created this list
    if (req.user.id !== listToBeUpdate.userRef) return next(errorHandler(401, 'You are not allowed to update the list that created by others.'));
    //3. else, in try and catch block, perform the update operation. Use new:true ensures we get the most 
    //   updated list, otherwise the old info will be returned
    try {
        const updatedArtList= await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedArtList);
    } catch (error) {  
        next(error);   
    }
};

export const getArtListInfo = async (req, res, next)=>{
    //first check if list exist
    const thatList = await Listing.findById(req.params.id);
    if (!thatList) return next(errorHandler(404, 'The list you are trying to view does not exist in our database'));
    //1. perform get op in try and catch block. 
    try {
        res.status(200).json(thatList);
    } catch (error) {
        next(error);
        
    }
};


export const getArtLists = async (req, res, next)=>{
    try {
        //set up the search creteria
        const numofReturnLimit = parseInt(req.query.numofReturnLimit) || 8;//refer to number of results returned in a single response or page.
        const startIndexOfPage = parseInt(req.query.startIndexOfPage) || 0; //startIndex is typically used in conjunction with .skip() to skip over a specified number of documents in the query results.
        
        let source = req.query.source;
        if (source === undefined || source === 'all'){ //when user type nothing in search bar, it is "undefined"
            source = {$in:["original", "imitation", "otherwork", "Imitation"]};//seach in database for all, no matter it is original work, imitation or other's work
        }else {
            source = { $eq: source }; // Use the provided source value
          }

        let artMedium = req.query.artMedium;
        if (artMedium === undefined || artMedium === 'all') {
            //these strings need to be exactly the same as the data in database
            artMedium = { $in: ['Pastel', 'Pencil', 'Charcoal', 'Pen', 'Chalk','Watercolor', 'Oil','Acrylic','Tempera', 'AI'] };
        }else {
            artMedium = { $eq: artMedium }; // Use the provided medium value
          }

        const keyword = req.query.keyword || ''; //keyword follows "listingName"

        const sortResult = req.query.sortResult || 'price';

        const order = req.query.order || 'descending';

        /*
         * 1) $regex: a MongoDB operator used to perform regular expression queries on string fields. 
        Powerful tools for pattern matching and string manipulation, allowing to search for strings that match a 
        specified pattern.
         */
        const artlistings = await Listing.find({
            listingName: { $regex: keyword, $options: 'i' },//make the search not case sensitive
            source,
            artMedium,
          }).sort({ [sortResult]: order }) //sort the result based on the "order" rule that I defined
            .limit(numofReturnLimit)
            .skip(startIndexOfPage);
      
          return res.status(200).json(artlistings);
        } catch (error) {
          next(error);
        }
};
