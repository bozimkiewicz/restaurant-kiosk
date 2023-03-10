const { sendQuery, internalErrorHandler } = require("./driver.controller");

const getCategoriesHandler = (req, res) => {
  const query = `MATCH (c:Categories) RETURN c`;

  sendQuery(
    query,
    (data) => res.send(data),
    () => internalErrorHandler(res)
  );
};

const getProductsByCategoryHandler = (req, res) => {
  const query = `MATCH (n:Products)-[:has_category]->(m:Categories WHERE m.name = "${req.params.name}") RETURN n`;

  sendQuery(
    query,
    (data) => res.send(data),
    () => internalErrorHandler(res)
  );
};

const updateCategoryHandler = (req, res) => {
  const category = {
    id: req.body.id,
    name: req.body.name,
  };

  const query = `MATCH (c:Categories {id: ${category.id}}) SET c.name="${category.name}" RETURN c`;

  sendQuery(
    query,
    (data) => res.send(data),
    (err) => internalErrorHandler(res)
  );
};

const newCategoryHandler = (req, res) => {
  const category = {
    id: req.body.id,
    name: req.body.name,
  };

  const query = `MATCH (c:Categories)
        WITH MAX(toInteger(c.id))+1 as new_id 
        CREATE (nc:Categories {id:new_id, name: "${category.name}"})
        RETURN nc`;

  sendQuery(
    query,
    (data) => res.send(data),
    () => internalErrorHandler(res)
  );
};

const deleteCategoryHandler = (req, res) => {
  const category = {
    id: req.body.id,
    name: req.body.name,
  };

  const query = `MATCH (c:Categories {id: ${category.id}}) DETACH DELETE c`;

  sendQuery(
    query,
    () => res.send({ message: `Deleted category with id: ${category.id}` }),
    () => internalErrorHandler(res)
  );
};

module.exports = {
  getCategoriesHandler,
  getProductsByCategoryHandler,
  updateCategoryHandler,
  newCategoryHandler,
  deleteCategoryHandler,
};
