import ICategory from "../interfaces/ICategory";
import { useState, useEffect } from "react";
import CategoryForm from "./AdminForm/CategoryForm";
import { useSelector } from "react-redux";

const CategoriesEditor = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentEditor, setCurrentEditor] = useState<number | null>(null);

  const token =
  useSelector<{ auth: {token: string}}, string>(
    (state) => state.auth.token
  ) || '';
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:3000/categories", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  };

  const deleteCategory = (category: ICategory) => {
    fetch("http://localhost:3000/categories", {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: category.id,
        name: category.name,
      }),
    })
      .then((response) => response.json())
      .then(() => fetchCategories())
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-2">
      <h4>Edytor Kategorii</h4>
      <div>
        <div className="flex justify-center">
          <CategoryForm onChange={fetchCategories} />
        </div>
        <ul>
          {categories.map((category, i) => (
            <li
              className="bg-white p-2 m-2 shadow-md rounded-md"
              key={i}
              onClick={() => setCurrentEditor(i)}
            >
              <div>
                <span>
                  ID: {category.id} Nazwa: {category.name}
                </span>
                <button
                  className="ml-5"
                  onClick={() => deleteCategory(category)}
                >
                  Usuń
                </button>
              </div>
              {currentEditor === i && (
                <CategoryForm
                  id={category.id}
                  name={category.name}
                  onChange={fetchCategories}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesEditor;
