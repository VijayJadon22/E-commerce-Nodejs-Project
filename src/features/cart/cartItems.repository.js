import { getDB } from "../../config/mongodb.js";
import { ObjectId, ReturnDocument } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class CartItemsRepository {

    static async add(userId, productId, quantity, next) {
        try {
            const db = getDB();
            const cartCollection = db.collection('cart');

            const id = await this.getCounter(db);

            const filter = { userId: new ObjectId(userId), productId: new ObjectId(productId) };
            const update = {
                $setOnInsert: { _id: id },
                $inc: { quantity: quantity }
            };
            const options = { upsert: true };
            const result = await cartCollection.updateOne(filter, update, options);

            if (result.modifiedCount > 0) {
                return "modified";
            } else if (result.upsertedId) {
                return "inserted";
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error in add method", error);
            next(error);
        }
    }

    static async get(userId) {
        try {
            const db = getDB();
            const cartCollection = db.collection('cart');
            return await cartCollection.find({ userId: new ObjectId(userId) }).toArray();
        } catch (error) {
            next(error);
        }
    }

    static async delete(itemId, userId, next) {
        try {
            const db = getDB();
            const cartCollection = db.collection('cart');
            const result = await cartCollection.deleteOne({ _id: new ObjectId(itemId), userId: new ObjectId(userId) });
            return result.deletedCount > 0;
        } catch (error) {
            next(error);
        }
    }

    static async getCounter(db) {
        const filter = { _id: "cartItems" };
        const update = { $inc: { value: 1 } };
        const options = { returnDocument: 'after' };
        const result = await db.collection('counters').findOneAndUpdate(filter, update, options);
        console.log(result);
        console.log(result.value);
        return result.value;
    }
}