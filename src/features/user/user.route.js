import express from "express";
import { UserController } from "./user.controller.js";
import { jwtAuth } from "../../middlewares/jwt.middleware.js";


const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup', userController.signUp);
userRouter.put('/changePassword',jwtAuth, userController.changePassword);
userRouter.post('/signin', userController.signIn);
export default userRouter;