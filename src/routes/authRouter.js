import { Router } from "express";
import register from "../controllers/authController.js";
import validateRegister from "../middlewares/validateRegister.js";

const  router  = Router();

router.post("/register", validateRegister, register); //colocar o middleware aqui


export default router;

//AQUI FICAM AS ROTAS .POST .GET .DELETE ETC