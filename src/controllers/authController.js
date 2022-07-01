import { db, objectId } from "../db/mongo.js";

async function register(req, res) {

    await db.collection("users").insertOne(res.locals.newRegister);

    res.sendStatus(201);
}

async function login(req, res) {

    const user = res.locals.user;
    const token = {
        token: user.token
    };

    const currentSession = await db.collection("sessions").findOne({userID: user.userID});

    if (currentSession) {
        const teste = await db.collection("sessions").updateOne({userID: user.userID}, {$set: token});

        res.status(200).send(user.token);
        
        return;
    }

    await db.collection("sessions").insertOne(user);

    res.status(200).send(user.token);
}

export { register, login };