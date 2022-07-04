import { db, objectId } from "../db/mongo.js";
import dayjs from "dayjs";

async function in_out(_, res) {

    const userID = res.locals.user.userID;
    const input = res.locals.post;

    const newInput = {
        ...input,
        userID,
        day: dayjs().format('DD/MM')
    };

    await db.collection("usersInOut").insertOne(newInput);

    res.sendStatus(201);
}

async function getPosts(_, res) {

    const userID = res.locals.user.userID;
    const { name } = await db.collection("users").findOne({_id: new objectId(userID)});
    const posts = await db.collection("usersInOut").find({userID: userID}).toArray();
    
    const start = 0;
    let total=0;

    for (let i = start; i<posts.length; i++){

        if (posts[i].in_out){
            total+=parseFloat(posts[i].value);
        } else {
            total=total-posts[i].value;
        }
    }

    total=parseFloat(total).toFixed(2);

    res.send({ name, posts, total });
}

async function deleteinout(req, res){

    const postID = res.locals.postID;

    await db.collection("usersInOut").deleteOne({_id: new objectId(postID)})

    res.sendStatus(202);

}

export { in_out, getPosts,deleteinout};