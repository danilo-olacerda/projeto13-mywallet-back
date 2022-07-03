import { db } from "../db/mongo.js";

async function in_out(req, res) {

    const userID = res.locals.user.userID;
    const input = res.locals.post;

    const newInput = {
        ...input,
        userID
    };

    await db.collection("usersInOut").insertOne(newInput);

    res.sendStatus(201);
}

export { in_out };