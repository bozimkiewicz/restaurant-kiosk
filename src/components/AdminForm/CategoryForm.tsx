import { Field, Form, Formik } from "formik";
import ICategory from "../interfaces/ICategory";

const CategoryForm = (props: {
  id?: number;
  name?: string;
  onChange: () => void;
}) => {
  const updateCategory = async (values: ICategory) => {
    await fetch("http://localhost:3000/categories", {
      method: props.id !== undefined ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: values.id,
        name: values.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.onChange();
      })
      .catch((err) => console.log(err));
  };

  const validateName = (value: string) => (!value ? "Required" : null);

  return (
    <Formik
      initialValues={{
        nazwa: props.name || "",
      }}
      onSubmit={(values) =>
        updateCategory({ id: props.id || 0, name: values.nazwa })
      }
    >
      {({ errors, touched }) => (
        <Form>
          <label htmlFor="nazwa">Nazwa: </label>
          <Field
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="nazwa"
            name="nazwa"
            placeholder="nazwa"
            validate={validateName}
          />
          {errors.nazwa && touched.nazwa && <div>{errors.nazwa}</div>}
          <button
            className="bg-my-orange-100"
            type="submit"
            disabled={!!errors.nazwa}
          >
            {props.id !== undefined ? "Zapisz" : "Dodaj"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
