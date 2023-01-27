const { driver } = require("../controllers/driver.controller");
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

productsRouter.get("/:product/ingredients", (req, res) => {
  const session = driver.session();

  session
    .run(
      `MATCH (n:Products)-[:has_ingredient]->(m:Ingredients) WHERE n.id=${req.params.product} RETURN m`
    )
    .then((data) =>
      data.records.map((ingredient) => ingredient._fields[0].properties)
    )
    .then((product_ingredients) => {
      return session
        .run(`MATCH (i:Ingredients) RETURN i`)
        .then((data) => data.records.map((i) => i._fields[0].properties))
        .then((all_ingredients) => {
          return {
            all_ingredients: all_ingredients,
            product_ingredients: product_ingredients,
          };
        });
    })
    .then((data) => {
      session.close();
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal server Error" });
    });
});

module.exports = productsRouter;
