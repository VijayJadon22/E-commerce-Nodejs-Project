import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserRepository {
    static async signUp(user, next) {
        try {
            // get the database
            const db = getDB();
            // get the collection
            let userCollection = db.collection('users');

            const userPresent = await userCollection.findOne(user);
            if (userPresent) {
                return res.status(400).send("User already resistered");
            }
            // insert the document in DB
            await userCollection.insertOne(user);
            console.log(user);
            return user;
        } catch (error) {
            next(error);
        }
    }

    static async signIn(email, password, next) {
        try {
            const db = getDB();
            const userCollection = db.collection('users');
            return await userCollection.findOne({ email, password });
        } catch (error) {
            next(error);
        }
    }

    static async findByEmail(email, next) {
        try {
            const db = getDB();
            const userCollection = db.collection('users');
            return await userCollection.findOne({ email});
        } catch (error) {
            next(error);
        }
    }
}