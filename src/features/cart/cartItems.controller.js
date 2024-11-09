import { ObjectId } from "mongodb";
import { CartItemsModel } from "./cartItems.model.js";
import { CartItemsRepository } from "./cartItems.repository.js";

export class CartItemsController {
    async add(req, res, next) {
        try {
            const userId = req.userId;
            const { productId, quantity } = req.query;

            const result = await CartItemsRepository.add(userId, productId, parseFloat(quantity), next);
            if (result == "modified") {
                return res.status(200).send({ status: "Quantity updated!" });
            } else if (result == "inserted") {
                return res.status(200).send({ status: "Product added to cart!" });
            } else {
                return res.status(400).send({ status: "Something Went wrong" });
            }
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const userId = req.userId;
            const items = await CartItemsRepository.get(userId, next);
            res.status(200).send(items);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const itemId = req.params.id;
            const userId = req.userId;
            const deletedItem = await CartItemsRepository.delete(itemId, userId, next);
            if (!deletedItem) {
                return res.status(400).send({ status: "Item not found" });
            }
            return res.status(200).send({ status: "Item removed from Cart" });
        } catch (error) {
            next(error);
        }
    }
}