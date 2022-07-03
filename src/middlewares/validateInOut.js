import joi from "joi";
import { db } from "../db/mongo.js";

const in_outSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    in_out: joi.boolean().required()
});

export default async function validateInOut(req, res, next){

    const { error } = in_outSchema.validate(req.body);

    if (error) {
        res.status(400).send("Dados invalidos!");
        return;
    }

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const user = await db.collection("sessions").findOne({token});

    if (!user) {
        res.status(404).send("Token inválido!");
        return;
    }

    res.locals.user = user;
    res.locals.post = req.body;

    next();
}