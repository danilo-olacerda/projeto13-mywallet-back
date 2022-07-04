import { Router } from "express";
import validateInOut from "../middlewares/validateInOut.js";
import validateGetPosts from "../middlewares/validateGetPosts.js";
import validateDelete from "../middlewares/validateDelete.js";
import { in_out, getPosts, deleteinout } from "../controllers/userController.js";

const  router  = Router();

router.post("/newinout", validateInOut, in_out);
router.get("/userinout", validateGetPosts, getPosts);
router.delete("/deleteinout/:postID", validateDelete, deleteinout);


export default router;