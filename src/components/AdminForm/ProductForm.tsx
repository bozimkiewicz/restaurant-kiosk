import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import ICategory from "../interfaces/ICategory";
import IIngredient from "../interfaces/IIngredient";
import IProduct from "../interfaces/IProduct";
import IProductWithRel from "../interfaces/IProductWithRel";

const ProductForm = (props: {
  product?: IProductWithRel;
  onChange: () => void;
  options: {
    ingredients: IIngredient[];
    categories: ICategory[];
  };
}) => {
  const token =
    useSelector<{ auth: { token: string } }, string>(
      (state) => state.auth.token
    ) || "";

  const updateProduct = (
    values: IProduct,
    ingredients: string[],
    categories: string[]
  ) => {
    fetch("http://localhost:3000/products", {
      method: props.product !== undefined ? "PUT" : "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: values.id,
        name: values.name,
        price: values.price,
        ingredients: ingredients,
        categories: categories,
      }),
    })
      .then((response) => response.json())
      .then((data) => props.onChange())
      .catch((err) => console.log(err));
  };

  const validateName = (value: string) => (!value ? "Required" : null);
  const validatePrice = (value: number) => {
    let error = null;
    if (value <= 0) {
      error = "Price must be positive number";
    } else if (isNaN(value)) {
      error = "Price must be a number";
    } else if (!value) {
      error = "Required";
    }
    return error;
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: props.product?.name || "",
          price: props.product?.price || 0,
          ingredients: props.product?.ingredients.map((i) => i.name) || [],
          categories: props.product?.categories.map((cat) => cat.name) || [],
        }}
        onSubmit={(values) =>
          updateProduct(
            {
              id: props.product?.id || 0,
              name: values.name,
              price: values.price,
            },
            values.ingredients,
            values.categories
          )
        }
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4 inline-block">
              <label htmlFor="name">Nazwa: </label>
              <Field
                className="bg-gray-50 border w-full text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                name="name"
                validate={validateName}
              />
              {errors.name && touched.name && <div>{errors.name}</div>}

              <label htmlFor="price">Cena: </label>
              <Field
                className="bg-gray-50 border w-full text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                name="price"
                validate={validatePrice}
              />
              {errors.price && touched.price && <div>{errors.price}</div>}
            </div>

            <div className="flex flex-row justify-center">
              <div className="border-solid bg-yellow-50 border-2 border-my-orange-200  rounded-md shadow-md mr-3">
                <label>Składniki: </label>
                <div className="flex flex-col p-3">
                  {props.options.ingredients.map((ing, i) => (
                    <label key={i}>
                      <Field
                        name="ingredients"
                        type="checkbox"
                        value={ing.name}
                      />
                      <span> {ing.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-solid bg-yellow-50 border-2 border-my-orange-200 rounded-md shadow-md">
                <label>Kategorie: </label>
                <div className="flex flex-col p-3">
                  {props.options.categories.map((cat, i) => (
                    <label key={i}>
                      <Field
                        name="categories"
                        type="checkbox"
                        value={cat.name}
                      />
                      <span> {cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="bg-my-orange-100 m-3 cursor-pointer"
              type="submit"
              disabled={!!errors.name || !!errors.price}
            >
              {props.product !== undefined ? "Zapisz" : "Dodaj"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
