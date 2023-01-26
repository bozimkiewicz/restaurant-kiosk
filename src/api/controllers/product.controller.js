const { sendQuery, internalErrorHandler } = require("./driver.controller");

const getProductsHandler = (req, res) => {
  const query = `MATCH (p:Products) RETURN p`;

  sendQuery(
    query,
    (data) => res.send(data),
    () => internalErrorHandler(res)
  );
};

const updateProductHandler = (req, res) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };

  const query = `MATCH (p:Products {id: ${product.id}}) SET p.name="${product.name}", p.price=${product.price} RETURN p`;

  sendQuery(
    query,
    (data) => res.send(data),
    (err) => {
      console.log(err);
      internalErrorHandler(res);
    }
  );
};

const newProductHandler = (req, res) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };

  const query = `MATCH (p:Products)
        WITH MAX(toInteger(p.id))+1 as new_id 
        CREATE (np:Products {id:new_id, name: "${product.name}", price: ${product.price}})
        RETURN np`;

  sendQuery(
    query,
    (data) => res.send(data),
    () => internalErrorHandler
  );
};

const deleteProductHandler = (req, res) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };

  const query = `MATCH (p:Products {id: ${product.id}}) DETACH DELETE p`;

  sendQuery(
    query,
    () => res.send({ message: `Deleted product with id: ${product.id}` }),
    () => internalErrorHandler(res)
  );
};

const addProductIngredientHandler = (req, res) => {
  const product_id = req.body.product_id;
  const ingredient_id = req.body.ingredient_id;

  const query = `MATCH (p: Products {id: ${product_id}}) 
        MATCH (i: Ingredients {id: ${ingredient_id}}) 
        CREATE (p)-[rel1:has_ingredient]->(i) 
        CREATE (i)-[rel2:has_products]->(p)`;

  sendQuery(
    query,
    () =>
      res.send({
        message: `Created rel between product_id: ${product_id} and ingredient_id ${ingredient_id}`,
      }),
    () => internalErrorHandler(res)
  );
};

const removeProductIngredientHandler = (req, res) => {
  const product_id = req.body.product_id;
  const ingredient_id = req.body.ingredient_id;

  const query = `MATCH (p:Products)-[rel1:has_ingredient]->(i:Ingredients)
        MATCH (i:Ingredients)-[rel2:has_products]->(p:Products)
        WHERE p.id=${product_id} AND i.id=${ingredient_id}
        DETACH DELETE rel1, rel2`;

  sendQuery(
    query,
    () =>
      res.send({
        message: `Deleted rel between product_id: ${product_id} and ingredient_id ${ingredient_id}`,
      }),
    () => internalErrorHandler(res)
  );
};

const setProductCategory = (req, res) => {
  const product_id = req.body.product_id;
  const category_id = req.body.category_id;

  const query = `
    MATCH (p:Products)<-[rel1:has_products]-(old:Categories)
    DETACH DELETE rel1
    MATCH (p)-[rel2:has_category]->(old)
    DETACH DELETE rel2
    CREATE (p)-[:has_category]->(cat:Categories)
    CREATE (cat)-[:has_products]->(p)
    WHERE p.id=${product_id} AND cat.id=${category_id}
    RETURN old
    `;

  sendQuery(
    query,
    () =>
      res.send({
        message: `Category for product_id: ${product_id} set with category_id ${category_id}`,
      }),
    () => internalErrorHandler(res)
  );
};

module.exports = {
  getProductsHandler,
  updateProductHandler,
  newProductHandler,
  deleteProductHandler,
  setProductCategory,
  addProductIngredientHandler,
  removeProductIngredientHandler,
};
