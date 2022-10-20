import dbConnect from "./dbConnect.js";
import { ObjectId } from "mongodb";

export async function getAllFurniture(req, res) {
    // connect to db
    const db = dbConnect()

    //get the whole furniture collection
    const collection = await db.collection("furniture").find().toArray()
        //catch err status 500
        .catch(err => {
            res.status(500).send(err);
            return;
        })
    //send back array furniture
    res.send(collection);
    res.set('Cache-Control', 'public', 'max-age=300, s-maxage=600')//cache from firebase web
}

//create
export async function addNewFurniture(req, res) {

    //get new furniture from the body of the request
    const { brand, modle, type, price } = req.body
    const newFurniture = { brand, modle, type, price }// price: Number(price)-if price is num, not string
    //connect db
    const db = dbConnect()
    //put the new furniture in our furn collection in our db
    await db.collection('furniture').insertOne(newFurniture)
        //catch err and send with status 500
        .catch(err => {
            res.status(500).send(err)
            return
        })
    // return res with 201
    res.status(201).send({ message: 'Furniture added ' })
}
// update
export async function updateFurniture(req, res) {

    const { furnitureId } = req.params
    const db = dbConnect()

    await db.collection('furniture')
        .findOneAndUpdate({ _id: new ObjectId(furnitureId) }, { $set: req.body })
        .catch(err => {
            res.status(500).send(err)
            return
        })
    res.status(202).send({ message: "furniture updated" })
}