import { Router } from "express";
import {
    login,
    regiter
} from "../handlers/authHandler.js";

import { 
    getAllUsers
} from "../handlers/index.js";

 const authRouter = Router();
 authRouter.post("/login", login)
 authRouter.post("/register", regiter)
 authRouter.get("/users", getAllUsers)


export default authRouter