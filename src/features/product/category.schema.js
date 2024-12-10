import mongoose, { Schema } from "mongoose";

export const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref:"products"
        }
    ]
})