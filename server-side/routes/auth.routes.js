import express from 'express';
import { register } from '../controllers/auth.controllers.js'; //need to add ".js" at the behind, otherwise will cause error

const router = express.Router();

router.post('/register', register);

export default router;