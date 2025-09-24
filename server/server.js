import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });


const MONGOURL=process.env.MONGODB_URL;

mongoose.connect(MONGOURL).then(() => {
  console.log(" MongoDB connected");
}).catch((err) => {
  console.error("Connection error:", err.message);
});
import authRouter from './routes/authRoutes.js';
import userAuth from "./middleware/userAuth.js";
import usersRouter from "./routes/users.js";

import postsRouter from "./routes/posts.js";



const app=express();
const port=3000;


const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials: true}));

//api end points
app.get('/', (req, res) => {
   console.log("GET / was hit");
  res.send('Hello! Server is working!');
});

app.use('/api/auth',authRouter)
app.use('/api/userauth',userAuth);
app.use('/api/users', userAuth, usersRouter);
app.use('/api/posts', userAuth, postsRouter);



app.listen(port,()=>{
  console.log(`server is running at port ${port}`);
});
