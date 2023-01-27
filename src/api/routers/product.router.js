const express = require('express');
const { checkSchema } = require("express-validator");
const resultValidator = require('../util/resultValidator');
const { ProductSchema, ProductIDSchema, ProductIngredientSchema, ProductCategorySchema } = require("../models/product.schema");
const { getProductsHandler, newProductHandler, updateProductHandler, deleteProductHandler, getProductsWithDataHandler } = require("../controllers/product.controller");

const ProductsRouter = express.Router();

//ProductsCRUDRouter.use(verifyToken)

ProductsRouter.get('/',
    getProductsHandler
)

ProductsRouter.get('/all',
    getProductsWithDataHandler
)

ProductsRouter.post('/',
    checkSchema(ProductSchema),
    resultValidator,
    newProductHandler
)

ProductsRouter.put('/',
    checkSchema(ProductSchema),
    resultValidator,
    updateProductHandler
)

ProductsRouter.delete('/',
    checkSchema(ProductIDSchema),
    resultValidator,
    deleteProductHandler
)

module.exports = ProductsRouter
