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

const productsRouter = require('./routers/productsRouter');

app.use('/products', productsRouter)

app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`))
