const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { driver } = require("./driver.controller");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.API_SECRET,
      (err, decode) => {
        if (err) {
          console.log(err);
          console.log(req.headers.authorization);
          res.status(403).send({ message: "Unauthorized" });
        }
        next();
      }
    );
  } else {
    res.status(403).send({ message: "Authorization needed" });
  }
};

// admin1 password
// admin2 c0mpl1c4t3d
// main_admin qwerty

const adminLogin = (req, res) => {
  const login = req.body.username;
  const password = req.body.password;

  const session = driver.session();

  session
    .run(`MATCH (a:Admin) WHERE a.username = "${login}" RETURN a LIMIT 1;`)
    .then((result) => result.records)
    .then((records) => {
      if (records.length !== 1) {
        res.status(404);
        throw new Error("Could not find a user");
      }
      // console.log(records[0].get('a').properties.password)
      return records[0].get("a").properties.password;
    })
    .then((hash) => {
      if (!bcrypt.compareSync(password, hash)) {
        res.status(401);
        throw new Error("Wrong password");
      }
      const token = jwt.sign(
        {
          id: login,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );

      res.status(200).send({
        message: "Login succesful",
        accessToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err });
    })
    .then(() => session.close());
};

module.exports = { adminLogin, verifyToken };
