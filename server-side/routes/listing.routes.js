import express from 'express';
import { createList } from '../controllers/listing.controllers.js';
import { verifyToken } from '../utilities/checkUser.js';

const router = express.Router();

router.post('/createlist', verifyToken, createList );

export default router;