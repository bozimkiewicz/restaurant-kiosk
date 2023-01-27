const result = require("dotenv").config()

if (result.error) {
  throw result.error
}

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const productsRouter = require('./routers/productsRouter');
const ProductRouter = require("./routers/product.router");
const IngredientRouter = require("./routers/ingredient.router");
const CategoryRouter = require("./routers/category.router");
const OrderRouter = require("./routers/order.router");
const { adminLogin } = require("./controllers/auth.controller");

app.post('/adminlogin', adminLogin)
app.use('/products', ProductRouter)
app.use('/ingredients', IngredientRouter)
app.use('/categories', CategoryRouter)
app.use('/orders', OrderRouter)

app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`))
