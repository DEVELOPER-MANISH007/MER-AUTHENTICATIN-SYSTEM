import express from "express";
import { register, login, logout, isAuthenticated } from "../Controller/AuthController.js";
import userAuth from "../Middleware/userAuth.js";
import { sendVerifyOtp, verifyEmail } from "../Controller/AuthController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp",userAuth, sendVerifyOtp);
authRouter.post("/verify-account",userAuth, verifyEmail);
authRouter.post("/is-auth",userAuth,isAuthenticated)




export default authRouter;