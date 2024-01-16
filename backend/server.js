import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import { notFound , errorHandler } from "./middleware/errorMiddleWare.js";
import connectDB from './Config/db.js'
const port = process.env.PORT || 3000;
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


mongoose.connect('mongodb://127.0.0.1:27017/MernAuth').then(()=>{
    console.log("mongo connected..")
})

// connectDB();
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use('/api/users' , userRoute)
app.use('/api/admin' , adminRoute)



// app.get('/' , (req,res)=>{
//     res.send("server is running..")
// })
app.use(notFound)
app.use(errorHandler)

app.listen(port , ()=>{
    console.log(`server now running on ${port}`);
})