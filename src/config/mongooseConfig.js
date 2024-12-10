import mongoose from "mongoose";
import { categorySchema } from "../features/product/category.schema.js";

export const connectWithMongoose = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB is connected via mongoose");
        addCategories();
    } catch (error) {
        console.error("Error while connecting with mongoose", error);
    }
}

const categoryModel = mongoose.model("category", categorySchema);
async function addCategories() {
    try {
        const categories = await categoryModel.find();
        if (categories.length == 0) {
            await categoryModel.insertMany([
                { name: "books" },
                { name: "clothing" },
                { name: "electronics" }
            ]);
            console.log("categories added");
        } 
    } catch (error) {
        console.error(error);
    }

}