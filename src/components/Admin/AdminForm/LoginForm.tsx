import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveToken } from "../../../slices/AuthSlice";

interface FormValues {
  login: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-white border-solid border-2 border-gray-100 rounded-md shadow-md p-5 mt-5">
      <h1 className="flex justify-center text-3xl pb-5">
        Podaj dane administratora
      </h1>
      <div className="flex justify-center">
        <Formik<FormValues>
          initialValues={{ login: "", password: "" }}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            if (!values.login) {
              errors.login = "Login required";
            }
            if (!values.password) {
              errors.password = "Password required";
            }
            return errors;
          }}
          onSubmit={(values) => {
            fetch("http://localhost:3000/adminlogin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: values.login,
                password: values.password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(
                  `${data.message}!\nAccessToken : ${data.accessToken}`
                );
                dispatch(saveToken({token: data.accessToken}));
                navigate("/crud")
              })
              .catch((err) => console.log(err));
          }}
        >
          {({ errors }) => (
            <Form>
              <Field
                className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                name="login"
                placeholder="Podaj login"
              />
              <ErrorMessage name="login" component="div" />
              <Field
                className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="password"
                name="password"
                placeholder="Podaj hasło"
              />
              <ErrorMessage name="password" component="div" />
              <button
                className="flex justify-end bg-my-orange-100"
                type="submit"
                disabled={!!errors.login || !!errors.password}
              >
                Zaloguj się
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
