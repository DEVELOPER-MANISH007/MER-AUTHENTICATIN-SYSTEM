import express from "express";
import { register, login, logout, isAuthenticated, sendResetOtp, resetPassword } from "../Controller/AuthController.js";
import userAuth from "../Middleware/userAuth.js";
import { sendVerifyOtp, verifyEmail } from "../Controller/AuthController.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp",userAuth, sendVerifyOtp);
authRouter.post("/verify-account",userAuth, verifyEmail);
authRouter.get("/is-auth",userAuth,isAuthenticated)
authRouter.post('/sed-reset-otp',sendResetOtp)
authRouter.post('/reset-password',resetPassword)




export default authRouter;