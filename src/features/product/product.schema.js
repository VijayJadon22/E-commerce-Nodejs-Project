import mongoose, { Schema } from "mongoose";

export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true // Ensure the URL is trimmed 
    },
    sizes: {
        type: [String],//specifies that sizes is an array of strings
    },
    stock: {
        type: Number,
        min: 1
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "category"
        }
    ]
}, { timestamps: true });