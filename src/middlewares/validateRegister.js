import joi from "joi";
//import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

export default async function validateRegister(req, res, next) {

    const newRegister = req.body;
    const { error } = registerSchema.validate(newRegister);
    
    if (error) {
        res.status(422).send(error);
        return;
    }
    if (newRegister.password!==newRegister.confirmPassword){
        res.status(400).send("As senhas devem ser iguais!");
        return;
    }

    delete newRegister.confirmPassword;
    
    newRegister.password = bcrypt.hashSync(newRegister.password, 10);

    res.locals.newRegister = newRegister;

    next();
}