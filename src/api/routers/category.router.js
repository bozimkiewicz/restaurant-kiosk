const express = require("express");
const { checkSchema } = require("express-validator");
const { verifyToken } = require("../controllers/auth.controller");
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
  verifyToken,
  checkSchema(CategorySchema),
  resultValidator,
  newCategoryHandler
);

CategoryRouter.put(
  "/",
  verifyToken,
  checkSchema(CategorySchema),
  resultValidator,
  updateCategoryHandler
);

CategoryRouter.delete(
  "/",
  verifyToken,
  checkSchema(CategorySchema),
  resultValidator,
  deleteCategoryHandler
);

module.exports = CategoryRouter;
