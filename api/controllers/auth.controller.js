const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decode) => {
      if (err) {
        res.status(403).send({ message: "Unauthorized" });
      }
      next();
    });
  } else {
    res.status(403).send({ message: "Authorization needed" });
  }
};

module.exports = { verifyToken };
