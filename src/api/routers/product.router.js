const express = require("express");
const { checkSchema } = require("express-validator");
const resultValidator = require("../util/resultValidator");
const {
  ProductSchema,
  ProductIDSchema,
} = require("../models/product.schema");
const {
  getProductsHandler,
  newProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsWithDataHandler,
} = require("../controllers/product.controller");
const { verifyToken } = require("../controllers/auth.controller");

const ProductsRouter = express.Router();

ProductsRouter.get("/", getProductsHandler);

ProductsRouter.get("/all", getProductsWithDataHandler);

ProductsRouter.post(
  "/",
  verifyToken,
  checkSchema(ProductSchema),
  resultValidator,
  newProductHandler
);

ProductsRouter.put(
  "/",
  verifyToken,
  checkSchema(ProductSchema),
  resultValidator,
  updateProductHandler
);

ProductsRouter.delete(
  "/",
  verifyToken,
  checkSchema(ProductIDSchema),
  resultValidator,
  deleteProductHandler
);

module.exports = ProductsRouter;
