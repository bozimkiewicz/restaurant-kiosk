const IngredientSchema = {
  id: {
    in: ["body"],
    errorMessage: "ID is wrong",
    isInt: true,
    toInt: true,
  },

  name: {
    in: ["body"],
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

module.exports = IngredientSchema;
