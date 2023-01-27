import { useState, useEffect } from "react";
import IIngredient from "../interfaces/IIngredient";
import IngredientsForm from "../AdminForm/IngredientForm";
import { useSelector } from "react-redux";

const IngredientsEditor = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [currentEditor, setCurrentEditor] = useState<number | null>(null);

  const token =
  useSelector<{ auth: {token: string}}, string>(
    (state) => state.auth.token
  ) || '';

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    fetch("http://localhost:3000/ingredients", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((err) => console.log(err));
  };

  const deleteIngredient = (ingredient: IIngredient) => {
    fetch("http://localhost:3000/ingredients", {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ingredient.id,
        name: ingredient.name,
      }),
    })
      .then((response) => response.json())
      .then(() => fetchIngredients())
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-2">
      <h4>Edytor składników</h4>
      <div>
        <div className="flex justify-center">
          <IngredientsForm onChange={fetchIngredients} />
        </div>
        <ul>
          {ingredients.map((ingredient, i) => (
            <li
              className="bg-white p-2 m-2 shadow-md border-solid border-2 border-my-orange-300 rounded-md"
              key={i}
              onClick={() => setCurrentEditor(i)}
            >
              <div>
                <span>
                  ID: {ingredient.id} Nazwa: {ingredient.name}
                </span>
                <button
                  className="ml-5"
                  onClick={() => deleteIngredient(ingredient)}
                >
                  Usuń
                </button>
              </div>
              {currentEditor === i && (
                <IngredientsForm
                  id={ingredient.id}
                  name={ingredient.name}
                  onChange={fetchIngredients}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientsEditor;
