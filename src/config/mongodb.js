import { MongoClient } from "mongodb";

// const url = "mongodb://localhost:27017/ecomdb";

let clientdb;
export const ConnectToMongoDB = () => {
    MongoClient.connect(process.env.DB_URL)
        .then(client => {
            clientdb = client.db();
            // creatinf counter
            createCounter(clientdb);
            createIndex(clientdb);
            console.log("MongoDb is connected!");
        }).catch(error => {
            console.error(error);
        })
}

export const getDB = () => {
    return clientdb;
}

const createCounter = async (db) => {
    const cartItemsCounter = await db.collection('counters').findOne({ _id: "cartItems" });
    if (!cartItemsCounter) {
        await db.collection('counters').insertOne({ _id: "cartItems", value: 0 });
    }

    const productsCounter = await db.collection('counters').findOne({ _id: "products" });
    if (!productsCounter) {
        await db.collection('counters').insertOne({ _id: "products", value: 0 });
    }
}

const createIndex = async (db) => {
    try {
        await db.collection('products').createIndex({ price: 1 });
        await db.collection('products').createIndex({ name: 1, category: -1 });
        await db.collection('products').createIndex({ desc: "text" });
    } catch (error) {
        console.log(error);
    }
}