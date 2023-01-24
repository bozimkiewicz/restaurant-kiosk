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

productsRouter.get("/categories", (req, res) => {
  const session = driver.session();
  session
    .run("MATCH (n:Categories) RETURN n")
    .then((data) => {
      const categories = data.records.map(
        (category) => category._fields[0].properties
      );
      res.send(categories);
    })
    .catch((error) => console.log(error));
});

productsRouter.get("/:category", (req, res) => {
  const session = driver.session();
  session
    .run(
      `MATCH (n:Products)-[:has_category]->(m:Categories WHERE m.name = '${req.params.category}') RETURN n`
    )
    .then((data) => {
      const products = data.records.map(
        (product) => product._fields[0].properties
      );
      res.send(products);
    })
    .catch((error) => console.log(error));
});

productsRouter.get("/ingredients/all", (req, res) => {
  const session = driver.session();
  session
    .run("MATCH (n:Ingredients) RETURN n")
    .then((data) => {
      const ingredients = data.records.map(
        (ingredient) => ingredient._fields[0].properties
      );
      res.send(ingredients);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
    })
    .then(() => session.close());
});

module.exports = productsRouter;
