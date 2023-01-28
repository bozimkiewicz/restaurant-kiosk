const { validationResult } = require("express-validator");

const resultValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors)
    return res.status(400).json({ errors: errors.errors });
  }
  next();
};

module.exports = resultValidator;
