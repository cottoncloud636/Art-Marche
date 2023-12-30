import  express  from "express";
// import { routeContent } from "../controllers/users.controllers.js";
import { register } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js";
import { updateForm } from "../controllers/users.controllers.js";
import { verifyToken } from "../utilities/checkUser.js";

const router = express.Router();

/* test Router function */
/* router.get('/test', routeContent);*/

router.post('/update/:id', verifyToken, updateForm)

export default router;