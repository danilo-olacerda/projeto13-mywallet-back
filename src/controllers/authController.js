import { db } from "../db/mongo.js";

export default async function register(req, res) {

    await db.collection("users").insertOne(res.locals.newRegister);

    res.sendStatus(201);
}