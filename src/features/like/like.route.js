import express from 'express';
import { LikeController } from './like.controller.js';

const likeController = new LikeController();

const likeRouter = express.Router();

likeRouter.post('/', likeController.likeItem);

export default likeRouter;

