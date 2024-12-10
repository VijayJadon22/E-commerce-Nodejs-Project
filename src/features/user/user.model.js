import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserModel {
    constructor(name, email, password, type) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static getUsers() {
        return users;
    }

    

    
}

var users = [
    {
        id: 1,
        name: "Vijay Jadon",
        email: "abz@gmail.com",
        password: 1234,
        type: "seller",
    },
    {
        id: 2,
        name: "Ajay Jadon",
        email: "abc@gmail.com",
        password: 1234,
        type: "seller",
    },
    {
        id: 3,
        name: "Swati Jadon",
        email: "abd@gmail.com",
        password: 1234,
        type: "seller",
    },
]