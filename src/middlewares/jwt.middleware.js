import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
    
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send("Unauthorized, Token expected");
    }
    try {
        const payload=jwt.verify(token, "lkZ5hCNno0");
        // console.log(payload);
        req.userId = payload.userId; /*manually adding a key userId in request */
    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized, Token Error");
    }
    next();
    
}