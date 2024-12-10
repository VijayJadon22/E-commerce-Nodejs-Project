import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";

const userModel = mongoose.model('users', userSchema);

export class UserRepository {
    static async signUp(newUser) {
        try {
            const user = new userModel(newUser);
            await user.save();
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            return await userModel.findOne({ email });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async changePass(userId, newPass) {
        try {
            let user = await userModel.findById(userId);
            if (user) {
                user.password = newPass;
                await user.save();
                return "password updated";
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}