import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export class ProductRepository {
    // get all products
    static async getAll(next) {
        try {
            const db = getDB();
            const productCollection = db.collection('products');
            const products = await productCollection.find().toArray();
            console.log(products);
            return products;
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    // add new product
    static async addNewproduct(name, desc, price, imagePath, category, sizes, next) {
        try {
            const db = getDB();
            const productCollection = db.collection('products');

            // getCounter for id
            const id = await this.getCounter(db);

            const result = await productCollection.insertOne({ _id: id, name, desc, price, imagePath, category, sizes });
            console.log(result.insertedId);
            return result.insertedId;
        } catch (error) {
            next(error);
        }
    }

    // getbyid
    static async findById(id) {
        try {
            const db = getDB();
            const productCollection = db.collection('products');
            // return await productCollection.findOne({ _id: new ObjectId(id) });
            return await productCollection.findOne({ _id: id });
        } catch (error) {
            console.log(error);
            throw error;
            // next(error);
        }
    }

    static async filterProduct(minPrice, maxPrice, category) {

        try {
            const db = getDB();
            const productCollection = db.collection('products');

            // const query = {
            //     price: {
            //         $gte: minPrice || 0,
            //         $lte: maxPrice || Infinity
            //     }
            // };

            const query = {
                $and: [
                    { price: { $gte: minPrice ?? 0 } },
                    { price: { $lte: maxPrice ?? Infinity } }
                ]
            };

            if (category) {
                // query.category = category;
                query.$and.push({ category: category });
            }
            const filteredProducts = await productCollection.find(query).project({ name: 1, price: 1, category: 1, _id: 0 }).toArray();
            if (filteredProducts.length == 0) {
                console.log("No products match the filter");
                return undefined;
            }
            return filteredProducts;
        } catch (error) {
            // next(error);
            console.log(error);
            throw error;
        }
    }

    // static async rateProduct(userId, productId, rating, next) {
    //     try {
    //         const db = getDB();
    //         const productCollection = db.collection('products');

    //         const result = await productCollection.updateOne(
    //             { _id: new ObjectId(productId) },
    //             {
    //                 $pull: { ratings: { userId: new ObjectId(userId) } },
    //                 $addToSet: { ratings: { userId: new ObjectId(userId), rating } }
    //             }
    //         );
    //         // console.log(`Update result: ${result.modifiedCount}`);
    //         return result.modifiedCount > 0
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    static async rateProduct(userId, productId, rating) {
        try {
            const db = getDB();
            const productCollection = db.collection('products');

            await productCollection.updateOne(
                { _id: productId },
                { $pull: { ratings: { userId: new ObjectId(userId) } } }
            );

            const result = await productCollection.updateOne(
                { _id: productId },
                { $push: { ratings: { userId: new ObjectId(userId), rating } } }
            );

            return result.modifiedCount > 0;
        } catch (error) {
            console.error('Error in rateProduct:', error);
            throw error;
            // next(error);
        }
    }

    static async categoryAveragePrice() {
        try {
            const db = getDB();
            const productCollection = db.collection('products');

            return await productCollection.aggregate([
                {
                    $group: {
                        _id: "$category",
                        averagePrice: { $avg: "$price" }
                    }
                }
            ]).toArray();
        } catch (error) {
            console.error('Error', error);
            throw error;
        }
    }

    static async averageRating() {
        try {
            const db = getDB();
            const productCollection = db.collection('products');

            return await productCollection.aggregate([
                {
                    $unwind: "$ratings"
                },
                {
                    $group: {
                        _id: "$name",
                        averageRating: { $avg: "$ratings.rating" }
                    }
                }
            ]).toArray();

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getCounter(db) {
        const filter = { _id: "products" };
        const update = { $inc: { value: 1 } };
        const options = { returnDocument: "after" };
        const result = await db.collection('counters').findOneAndUpdate(filter, update, options);
        return result.value;
    }


}