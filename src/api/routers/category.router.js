const express = require("express");
const { checkSchema } = require("express-validator");
const {
  getCategoriesHandler,
  newCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getProductsByCategoryHandler,
} = require("../controllers/category.controller");
const CategorySchema = require("../models/category.schema");
const resultValidator = require("../util/resultValidator");

const CategoryRouter = express.Router();

CategoryRouter.get("/", getCategoriesHandler);

CategoryRouter.get(
  "/:name",
  checkSchema({
    name: {
      in: ["param"],
      errorMessage: "Name is wrong",
      isString: true,
      isLength: {
        options: {
          min: 3,
          max: 20,
        },
      },
    },
  }),
  resultValidator,
  getProductsByCategoryHandler
);

CategoryRouter.post(
  "/",
  checkSchema(CategorySchema),
  resultValidator,
  newCategoryHandler
);

CategoryRouter.put(
  "/",
  checkSchema(CategorySchema),
  resultValidator,
  updateCategoryHandler
);

CategoryRouter.delete(
  "/",
  checkSchema(CategorySchema),
  resultValidator,
  deleteCategoryHandler
);

module.exports = CategoryRouter;
