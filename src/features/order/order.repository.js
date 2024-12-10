import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { OrderModel } from "./order.model.js";

export class OrderRepository {

    static async placeOrder(userId) {
        try {
            const db = getDB();
            //1. get the cartItems of the user and calculate total price
            const items = await this.getTotalAmount(userId);
            const totalPrice = items.reduce((total, item) => total += item.totalPrice, 0);
            console.log(totalPrice);

            //2. create a record of the order
            const newOrder = new OrderModel(new ObjectId(userId), totalPrice);
            console.log(newOrder);

            // insert the object in order collection in databse
            await db.collection('orders').insertOne(newOrder);

            //3. reduce the stock
            for (let item of items) {
                await db.collection('products').updateOne(
                    { _id: item.productId },
                    {$inc:{stock:-item.quantity}}
                )
            };

            //4. clear the cart
            await db.collection('cart').deleteMany(
                { userId: new ObjectId(userId) }
            )
            return; 
            
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

            return items;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}