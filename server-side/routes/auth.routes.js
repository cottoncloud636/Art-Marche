import express from 'express';
import { register } from '../controllers/auth.controllers.js'; //need to add ".js" at the behind, otherwise will cause error
import { login } from '../controllers/auth.controllers.js';
import { googleauth } from '../controllers/auth.controllers.js';
import { logout } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/googleauth', googleauth);
router.get('/logout', logout); //use get for logout cuz I am not posting any data for this logout feature

export default router;