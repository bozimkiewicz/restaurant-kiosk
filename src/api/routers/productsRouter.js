const driver = require("../controllers/driver.controller");
const express = require("express");

const productsRouter = express.Router();

productsRouter.get("/all", (req, res) => {
  const session = driver.session();
  session
    .run("MATCH (n:Products) RETURN n")
    .then((data) => {
      const products = data.records.map(
        (product) => product._fields[0].properties
      );
      res.send(products);
    })
    .catch((error) => console.log(error));
});

module.exports = productsRouter;
