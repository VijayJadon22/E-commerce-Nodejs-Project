import mongoose, { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }

})