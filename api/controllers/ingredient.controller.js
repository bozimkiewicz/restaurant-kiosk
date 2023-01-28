const {
  sendQuery,
  internalErrorHandler,
  driver,
} = require("./driver.controller");

const getIngredientsHandler = (req, res) => {
  const query = `MATCH (i:Ingredients) RETURN i`;

  sendQuery(
    query,
    (data) => res.send(data),
    () => internalErrorHandler(res)
  );
};

const getProductIngredientsHandler = (req, res) => {
  const session = driver.session();

  session
    .run(
      `MATCH (n:Products)-[:has_ingredient]->(m:Ingredients) WHERE n.id=${req.params.id} RETURN m`
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
};

const updateIngredientHandler = (req, res) => {
  const ingredient = {
    id: req.body.id,
    name: req.body.name,
  };

  const query = `MATCH (i:Ingredients {id: ${ingredient.id}}) SET i.name="${ingredient.name}" RETURN i`;

  sendQuery(
    query,
    (data) => res.send(data),
    (err) => {
      console.log(err);
      internalErrorHandler(res);
    }
  );
};

const newIngredientHandler = (req, res) => {
  const ingredient = {
    id: req.body.id,
    name: req.body.name,
  };

  const query = `MATCH (i:Ingredients)
        WITH MAX(toInteger(i.id))+1 as new_id 
        CREATE (ni:Ingredients {id:new_id, name: "${ingredient.name}"})
        RETURN ni`;

  sendQuery(
    query,
    (data) => res.send(data),
    () => internalErrorHandler
  );
};

const deleteIngredientHandler = (req, res) => {
  const ingredient = {
    id: req.body.id,
    name: req.body.name,
  };

  const query = `MATCH (i:Ingredients {id: ${ingredient.id}}) DETACH DELETE i`;

  sendQuery(
    query,
    () => res.send({ message: `Deleted ingredient with id: ${ingredient.id}` }),
    () => internalErrorHandler(res)
  );
};

module.exports = {
  getIngredientsHandler,
  getProductIngredientsHandler,
  updateIngredientHandler,
  newIngredientHandler,
  deleteIngredientHandler,
};
