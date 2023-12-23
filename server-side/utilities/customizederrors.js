

export const errorHandler = (statusCode, msg) => { //set up a manual status code and message
    //the following 3 lines is for building a customized error, first create an obj, then setup its statusCode and message part
    const err = new Error(); //create an error obj
    err.statusCode = statusCode; //get the statusCode from input of the msg and set this code back to err.statusCode
    err.message = msg;
    
    return err;

};