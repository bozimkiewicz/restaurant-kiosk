const CategorySchema = {
  id: {
    in: ["body", "param"],
    errorMessage: "ID is wrong",
    isInt: true,
    toInt: true,
  },

  name: {
    in: ["body", "param"],
    errorMessage: "Name is wrong",
    isString: true,
    isLength: {
      errorMessage: "Name must contain 3 to 20 characters",
      options: {
        min: 3,
        max: 20,
      },
    },
    trim: true,
  },
};

module.exports = CategorySchema;
