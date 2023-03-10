const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
  {
    disableLosslessIntegers: true,
  }
);

const internalErrorHandler = (res) => {
  res.status(500).send({ message: "Internal server error" });
};

const sendQuery = (query, onSuccess, onFailure) => {
  const session = driver.session();

  session
    .run(query)
    .then((data) => data.records.map((item) => item._fields[0].properties))
    .then((data) => onSuccess(data))
    .catch((err) => {
      console.log(err);
      onFailure(err);
    })
    .then(() => session.close());
};

driver
  .getServerInfo()
  .then((data) => console.log(`Driver created. ${data.address}`))
  .catch((reason) => console.log(`ERROR : ${reason}`));

module.exports = { driver, sendQuery, internalErrorHandler };
