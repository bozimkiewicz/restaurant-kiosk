import { useState, useEffect } from "react";
import IProduct from "../../interfaces/IProduct";
import IIngredient from "../../interfaces/IIngredient";

const ProductCustomizer = (props: {
  product: IProduct;
}) => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [productIngredients, setProductIngredients] = useState<IIngredient[]>(
    []
  );

  const fetchProductIngredients = () => {
    fetch(`http://localhost:3000/products/${props.product.id}/ingredients`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data.all_ingredients);
        setProductIngredients(data.product_ingredients);
      })
      .catch((error) => console.log(error));
  };

  const handleMoveItems = (item: IIngredient) => {
    setProductIngredients([...productIngredients, item]);
  };

  const removeItems = (idx: number) => {
    setProductIngredients([
      ...productIngredients.slice(0, idx),
      ...productIngredients.slice(idx + 1, productIngredients.length),
    ]);
  };

  useEffect(() => {
    fetchProductIngredients();
  }, []);

  return (
    <div>
      <h1>Wybierz składniki</h1>
      <div>
        <div>
          <h4>Dostępne składniki:</h4>
          <ul>
            {ingredients.map((item) => (
              <button key={item.id} onClick={() => handleMoveItems(item)}>
                {item.name}
              </button>
            ))}
          </ul>
        </div>
        <div>
          <h4>Składniki w produkcie:</h4>
          <ul>
            {productIngredients.map((item, idx) => (
              <button key={idx} onClick={() => removeItems(idx)}>
                {item.name}
              </button>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <button>Dodaj do zamówienia</button>
      </div>
    </div>
  );
};

export default ProductCustomizer;
