import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRounds = 12; /*number should be between 10-20, bigger the number the more complex password and will take more time to hash it*/

import { UserModel } from "./user.model.js";
import { UserRepository } from './user.repository.js';
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserController {
    async signUp(req, res, next) {
        try {
            // creating the document
            const { name, email, password, type } = req.body;
            // hash the password
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new UserModel(name, email, hashedPassword, type);
            const user = await UserRepository.signUp(newUser, next);
            res.status(201).send(user);
        } catch (error) {
            next(error);
        }

    }

    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            // const user = await UserRepository.signIn(email, password, next);
            const user = await UserRepository.findByEmail(email);
            
            if (!user) {
                return res.status(400).send("Invalid creds");
            }
            /*comparing hashed password from database and the password that user entered while signingin*/
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                // if valid user then we will create JWT token
                const payload = {
                    userId: user._id,
                    email: user.email,
                }
                const secretKey = process.env.JWT_SECRETKEY; //we declared the key in .env file
                const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
                return res.status(200).send({ Login: "successful", token: token });
            } else {
                return res.status(400).send("Invalid creds");
            }
        } catch (error) {
            next(error);
        }
    }

    async changePassword(req, res, next) {
        try {
            const userId = req.userId;
            const newPass = req.body.newPass;
            const hashedPassword = await bcrypt.hash(newPass, saltRounds);

            const result = await UserRepository.changePass(userId, hashedPassword);
            if (!result) {
                return res.status(400).send("Password not updated!");
            }
            return res.status(200).send("Password updated successfuly!");
        } catch (error) {
            next(error);
        }
    }
}