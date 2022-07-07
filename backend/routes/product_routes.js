import express from "express";
import { getAllProduct, singleProductDetails } from '../controllers/product-controller.js'

const productRouter = express.Router();

productRouter.get("/", getAllProduct);

productRouter.get("/product/:id", singleProductDetails);





export default productRouter