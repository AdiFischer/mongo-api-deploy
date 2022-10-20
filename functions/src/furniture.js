import dbConnect from "./dbConnect.js";

export async function getAllFurniture(req, res) {
    // connect to db
    const db = dbConnect()

    //get the whole futniture collection
    const collection = await db.collection("furniture").find().toArray()
    //ctach err status 500
    .catch(err => {
        res.status(500).send(err);
        return;
    })
    //send back array furniture
    res.send(collection);
}