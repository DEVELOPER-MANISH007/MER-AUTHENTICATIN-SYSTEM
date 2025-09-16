import express from "express";
import { getUserData } from "../Controller/UserController.js";
import userAuth from "../Middleware/userAuth.js";




const userRouter = express.Router();



userRouter.get('/data',userAuth ,getUserData)


export default userRouter;