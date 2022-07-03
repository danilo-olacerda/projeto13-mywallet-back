import { Router } from "express";
import validateInOut from "../middlewares/validateInOut.js";
import { in_out } from "../controllers/userController.js";

const  router  = Router();

router.get("/userinout", validateInOut, in_out);
//router.post("/in", validateLogin, login);
//router.post("/out")


export default router;