import  express  from "express";
// import { routeContent } from "../controllers/users.controllers.js";
import { register } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js";
import { updateForm } from "../controllers/users.controllers.js";
import { verifyToken } from "../utilities/checkUser.js";
import { deleteUser } from "../controllers/users.controllers.js";
import { getUserArtListing } from "../controllers/users.controllers.js";

const router = express.Router();

/* test Router function */
/* router.get('/test', routeContent);*/

router.post('/update/:id', verifyToken, updateForm);
router.delete('/delete/:id', verifyToken, deleteUser);

router.get('/user-art-listing/:id', verifyToken, getUserArtListing)//get the listing info from mongoDB (thru mongoose model I created in listing.model.js)
                                    //the endpoint /user-art-listing can be anyname, think about this
                                    //process: creat an end point, and retrieve a user's listing based on a unique identifier (:id)
                                    //from the model, make this /user-art-listing/:id as an address for the info 
                                    //that I just retrieved a home address
                    
export default router;