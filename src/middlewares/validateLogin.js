import joi from "joi";
import bcrypt from 'bcrypt';
import { db, objectId } from "../db/mongo.js";
import { v4 as uuid } from "uuid";

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default async function validateLogin(req, res, next) {
    
    const data = req.body;

    const { error } = loginSchema.validate(data);

    if (error) {
        res.status(422).send("Todos os campos são obrigatórios!");
        return;
    }

    const user = await db.collection("users").findOne({email: data.email});

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
        res.status(404).send("Email ou senha Inválidos!");
        return;
    }

    const token = uuid();

    const newSession = {
        userID: objectId(user._id),
        token
    }

    res.locals.user = newSession;

    next();
}