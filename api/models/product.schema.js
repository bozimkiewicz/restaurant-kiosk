const ProductSchema = {
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
      errorMessage: "Name must contain 3 to 30 characters",
      options: {
        min: 3,
        max: 30,
      },
    },
    trim: true,
  },

  price: {
    in: ["body"],
    errorMessage: "Price is wong",
    isDecimal: true,
  },

  categories: {
    in: ["body"],
    errorMessage: "Categories must be array",
    isArray: true,
  },

  ingredients: {
    in: ["body"],
    errorMessage: "Ingredients must be array",
    isArray: true,
  },
};

const ProductIDSchema = {
  id: {
    in: ["body", "param"],
    errorMessage: "ID is wrong",
    isInt: true,
    toInt: true,
  },
};

const ProductIngredientSchema = {
  product_id: {
    in: ["body", "param"],
    errorMessage: "ID is wrong",
    isInt: true,
    toInt: true,
  },
  ingredient_id: {
    in: ["body", "param"],
    errorMessage: "ID is wrong",
    isInt: true,
    toInt: true,
  },
};

const ProductCategorySchema = {
  product_id: {
    in: ["body", "param"],
    errorMessage: "ID is wrong",
    isInt: true,
    toInt: true,
  },
  category_id: {
    in: ["body", "param"],
    errorMessage: "ID is wrong",
    isInt: true,
    toInt: true,
  },
};

module.exports = {
  ProductSchema,
  ProductIDSchema,
  ProductIngredientSchema,
  ProductCategorySchema,
};
