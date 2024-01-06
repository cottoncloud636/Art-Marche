import express from 'express';
import { createList } from '../controllers/listing.controllers.js';
import { verifyToken } from '../utilities/checkUser.js';
import { deleteList } from '../controllers/listing.controllers.js';

const router = express.Router();

router.post('/createlist', verifyToken, createList );

router.delete('/deletelist/:id', verifyToken, deleteList);

export default router;