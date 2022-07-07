import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import productRouter from './routes/product_routes.js'
import UserRouter from './routes/user_routes.js'
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json()); 
app.use("/api/products",productRouter);
app.use("/api/users",UserRouter);


mongoose.connect(process.env.MONGO_URL)
.then(()=>app.listen(process.env.PORT))
.then(()=>console.log(`Mongodb Connected to database and server running on ${process.env.PORT} `))
.catch((err)=> console.log(err));
