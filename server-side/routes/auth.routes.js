import express from 'express';
import { register } from '../controllers/auth.controllers.js'; //need to add ".js" at the behind, otherwise will cause error
import { login } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

export default router;