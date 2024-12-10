import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //removed white spaces from both the ends
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures the email is unique
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        // validate: {
        //     validator: function (value) {
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        //     },
        //     message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
        // }
    },
    type: {
        type: String,
        required: true,
        enum: ["seller", "customer"],
        trim: true
    }
});