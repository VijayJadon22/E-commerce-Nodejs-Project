import { UserModel } from "../features/user/user.model.js";
export const basicAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(req.headers); 
    console.log(authHeader);   /*Basic YWJ6QGdtYWlsLmNvbToxMjM0*/
    if (!authHeader) {
        return res.send("Headers details not found");
    }
    const base64Creds = authHeader.split(" ")[1];
    console.log(base64Creds);    /*YWJ6QGdtYWlsLmNvbToxMjM0*/

    const decodedData = Buffer.from(base64Creds, 'base64').toString("utf8");
    console.log(decodedData);
    const email = decodedData.split(":")[0];
    const password = decodedData.split(":")[1];
    console.log(email, password);
    const user = UserModel.signIn(email, password);

    if (user) {
        next();
    } else {
        return res.status(400).send("Incorrect creds");
    }
}