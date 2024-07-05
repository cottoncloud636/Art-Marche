import express from 'express';
import { createList } from '../controllers/listing.controllers.js';
import { verifyToken } from '../utilities/checkUser.js';
import { deleteList } from '../controllers/listing.controllers.js';
import { updateArtList } from '../controllers/listing.controllers.js';
import { getArtListInfo } from '../controllers/listing.controllers.js';
import { getArtLists } from '../controllers/listing.controllers.js';

const router = express.Router();

router.post('/createlist', verifyToken, createList );

router.delete('/deletelist/:id', verifyToken, deleteList);

router.post('/editlist/:id', verifyToken, updateArtList);

router.get('/getlist/:id', getArtListInfo);  //to get that list info for edit functionality. 
                                //no need to verifyToken, since later on every user can get the list to "view"
router.get('/getsearch', getArtLists);

export default router;