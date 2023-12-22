import  express  from "express";
import { routeContent } from "../controllers/users.controllers.js";

const router = express.Router();

/* test Router function */
router.get('/test', routeContent);

export default router;