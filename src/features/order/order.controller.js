import { ApplicationError } from "../../error-handler/applicationError.js";
import { OrderRepository } from "./order.repository.js";

export class OrderController{

    async placeOrder(req, res, next) {
        try {
            const userId = req.userId;
            await OrderRepository.placeOrder(userId);
            return res.status(200).send("Order Placed");
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}