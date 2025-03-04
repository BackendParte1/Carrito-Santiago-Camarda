import express from "express";
import {
  addProduct,
  deleteProducts,
  getProducts,
} from "../controllers/ProductControlers.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:productId", deleteProducts);

export default router;
