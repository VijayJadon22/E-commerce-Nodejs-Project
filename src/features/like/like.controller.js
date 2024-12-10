import { LikeRepository } from "./like.repository.js";


export class LikeController{
    async likeItem(req, res, next) {
        try {
            const userId = req.userId;
            const { id, type } = req.body;
            const newLike = await LikeRepository.likeItem(userId, id, type);
            if (!newLike) {
                return res.status(400).send("Like not posted");
            }
            return res.status(200).send("Like posted");
            
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }
}