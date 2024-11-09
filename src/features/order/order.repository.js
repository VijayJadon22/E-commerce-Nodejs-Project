import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export class OrderRepository {

    static async placeOrder(userId) {
        try {
            const res = await this.getTotalAmount(userId);
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getTotalAmount(userId) {
        try {
            const db = getDB();
            const cartItemCollection = db.collection('cart');

            const items = await cartItemCollection.aggregate([
                {
                    $match: { userId: new ObjectId(userId) }
                },
                // get the products from products collection
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "ProductInfo"
                    }
                },
                {
                    $unwind: "$ProductInfo"
                },
                {
                    $addFields: {
                        "totalPrice": {
                            $multiply: ["$ProductInfo.price", "$quantity"]
                        }
                    }
                }
            ]).toArray();

            const totalPrice = items.reduce((total, item) => total += item.totalPrice, 0);
            console.log(totalPrice);
            return items;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}