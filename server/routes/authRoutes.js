import express from 'express'
import { login, logout, register } from '../controllers/authController.js';


const authRouter=express.Router(); // router contains group of routes where routes is used to connect fronted and backend

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
export default authRouter;