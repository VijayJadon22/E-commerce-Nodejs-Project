import mongoose, { Schema } from "mongoose";

export const reviewSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: "products"
    },
    userId: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: "users"
    },
    rating: {
        type: Number,
        required: true,
        max: 5,
    }
})