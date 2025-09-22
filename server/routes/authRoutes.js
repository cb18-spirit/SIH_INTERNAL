import express from 'express'
import { login, logout, register, sendVerifyOtp, verifyAccount } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';


const authRouter=express.Router(); // router contains group of routes where routes is used to connect fronted and backend

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/verify-otp',userAuth,);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-account',userAuth,verifyAccount);
export default authRouter;