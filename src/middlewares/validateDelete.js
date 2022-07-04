import { db, objectId } from "../db/mongo.js";
import joi from "joi";

const postSchema=joi.object({
    post: joi.string().min(24).required()
});

export default async function validateDelete(req, res, next){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const post  = {
        post: req.params.postID
    }
    const { error } = postSchema.validate(post);
    let validPost;

    if (error){
        res.status(400).send(error);
        return; 
    }

    const user = await db.collection("sessions").findOne({token});

    try {
        validPost = await db.collection("usersInOut").findOne({_id: new objectId(post.post)});
    } catch (error) {
        res.status(400).send("Id do post invalido!");
        return;
    }


    if (!user) {
        res.status(404).send("Token inválido!");
        return;
    }
    if (!validPost){
        res.status(404).send("Id do post inválido!");
        return;
    }

    if (JSON.stringify(user.userID)!=JSON.stringify(validPost.userID)){
        res.status(400).send("O usuario não é o proprietario!");
        return;
    }

    res.locals.postID = post.post;

    next();
}