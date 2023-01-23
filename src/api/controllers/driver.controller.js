const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
  {
    disableLosslessIntegers: true
  }
);

driver
  .getServerInfo()
  .then((data) => console.log(`Driver created. ${data}`))
  .catch((reason) => console.log(`ERROR : ${reason}`));

module.exports = driver