import express from "express";
import { getProducts, deleteProducts, addProduct,addProductsMany } from "../controllers/Product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.post("/bulk", addProductsMany); // Para agregar varios productos a la vez

router.delete("/:productId", deleteProducts);

export default router;
