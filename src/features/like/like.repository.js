import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";

const likeModel = mongoose.model('likes', likeSchema);
export class LikeRepository{
    static async likeItem(userId, id, type) {
        try {
            const newLike = new likeModel({
                userId,
                likeable: id,
                type
            });
            await newLike.save();
            return newLike;
        } catch (error) {
            console.error("Error: ", error);
            throw error;
        }
    }
}