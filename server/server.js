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

const app=express();
const port=3000;

app.use(express.json());
app.use(cookieParser);
app.use(cors({credentials: true}));


app.get('/', (req, res) => {
  res.send('Hello! Server is working!');
});

app.listen(port,()=>console.log('server is running at port 3000'));
