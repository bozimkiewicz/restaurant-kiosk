const express = require("express");
const { checkSchema } = require("express-validator");
const {
  getIngredientsHandler,
  newIngredientHandler,
  updateIngredientHandler,
  deleteIngredientHandler,
  getProductIngredientsHandler,
} = require("../controllers/ingredient.controller");
const IngredientSchema = require("../models/ingredient.schema");
const resultValidator = require("../util/resultValidator");

const IngredientRouter = express.Router();

IngredientRouter.get("/", getIngredientsHandler);

IngredientRouter.get(
  "/:id",
  checkSchema({
    id: {
      in: ["param"],
      errorMessage: "ID is wrong",
      isInt: true,
      toInt: true,
    },
  }),
  resultValidator,
  getProductIngredientsHandler
);

IngredientRouter.post(
  "/",
  checkSchema(IngredientSchema),
  resultValidator,
  newIngredientHandler
);

IngredientRouter.put(
  "/",
  checkSchema(IngredientSchema),
  resultValidator,
  updateIngredientHandler
);

IngredientRouter.delete(
  "/",
  checkSchema(IngredientSchema),
  resultValidator,
  deleteIngredientHandler
);

module.exports = IngredientRouter;
