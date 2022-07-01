import { Router } from "express";
import { register, login} from "../controllers/authController.js";
import validateRegister from "../middlewares/validateRegister.js";
import validateLogin from "../middlewares/validateLogin.js";

const  router  = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);


export default router;