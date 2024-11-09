import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import cors from 'cors';

import productRouter from './src/features/product/product-route.js';
import userRouter from './src/features/user/user.route.js';
import cartRouter from './src/features/cart/cartItems.route.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
// import { basicAuth } from './src/middlewares/basicAuth.middleware.js';
import { jwtAuth } from './src/middlewares/jwt.middleware.js';

import apiDocs from './swagger.json' assert {type: "json"};
import { ApplicationError } from './src/error-handler/applicationError.js';
import { ConnectToMongoDB } from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.route.js';

const PORT = 7200;

const server = express();

server.use(bodyParser.json());

/* implementing cors because server does not allow requests from different origins by default. To fix this, we need to enable CORS on your server */
server.use(cors());

server.use(loggerMiddleware);


server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

server.use('/api/products', jwtAuth, productRouter);

/*this method is using Basic Auth */
// server.use('/api/users',basicAuth, userRouter);  

/*here we are using JWT token*/
server.use('/api/users', userRouter);
server.use('/api/cartItems', jwtAuth, cartRouter);
server.use('/api/order', jwtAuth, orderRouter);

/* Error handler middleware:- handeling genric errors*/
server.use((err, req, res, next) => {
    // if(err.code){
    if (err instanceof ApplicationError) {
        return res.status(err.code).send({ Error: err.message });
    }
    return res.status(500).send("Could not process the request, Please try again!");
});

// if no path present then this will be displayed 
server.use((req, res) => {
    return res.send("Page not found! please check the API");
});

server.listen(PORT, () => {
    console.log(`Server stared at Port:${PORT}`);
    ConnectToMongoDB();
});