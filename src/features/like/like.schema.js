import mongoose, { Schema } from "mongoose";

export const likeSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    likeable: {
        type: Schema.Types.ObjectId,
        refPath: "type",
    },
    type: {
        type: String,
        enum: ["products", "categories"]
    }
}).pre('save', (next) => {
    console.log("Pre executing Before saving");
    next();
}).post('save', () => {
    console.log("Post executing after saving");
})