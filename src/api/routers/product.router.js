const express = require("express");
const { checkSchema } = require("express-validator");
const resultValidator = require("../util/resultValidator");
const {
  ProductSchema,
  ProductIDSchema,
  ProductIngredientSchema,
  ProductCategorySchema,
} = require("../models/product.schema");
const {
  getProductsHandler,
  newProductHandler,
  updateProductHandler,
  deleteProductHandler,
  addProductIngredientHandler,
  removeProductIngredientHandler,
  setProductCategory,
} = require("../controllers/product.controller");

const ProductsRouter = express.Router();

//ProductsCRUDRouter.use(verifyToken)

ProductsRouter.get("/", getProductsHandler);

ProductsRouter.post(
  "/",
  checkSchema(ProductSchema),
  resultValidator,
  newProductHandler
);

ProductsRouter.put(
  "/",
  checkSchema(ProductSchema),
  resultValidator,
  updateProductHandler
);

ProductsRouter.delete(
  "/",
  checkSchema(ProductIDSchema),
  resultValidator,
  deleteProductHandler
);

// ProductsRouter.post('/category',
//     checkSchema(ProductCategorySchema),
//     resultValidator,
//     setProductCategory
// )

ProductsRouter.post(
  "/ingredients",
  checkSchema(ProductIngredientSchema),
  resultValidator,
  addProductIngredientHandler
);

ProductsRouter.delete(
  "/ingredients",
  checkSchema(ProductIngredientSchema),
  resultValidator,
  removeProductIngredientHandler
);

module.exports = ProductsRouter;
