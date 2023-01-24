import { useState, useEffect } from "react";
import IProduct from "../../interfaces/IProduct";
import IIngredient from "../../interfaces/IIngredient";
import Modal from "../../UI/Modal";

const ProductCustomizer = (props: {
  product: IProduct;
  onClose: React.MouseEventHandler;
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
    <Modal onClose={props.onClose}>
      <h1 className="flex justify-center mb-5">Wybierz składniki</h1>
      <div className="flex h-96 overflow-y-auto">
        <div className="w-1/2 p-1">
          <h4>Dostępne składniki:</h4>
          <ul className="p-0.5">
            {ingredients.map((item) => (
              <button className="m-1" key={item.id} onClick={() => handleMoveItems(item)}>
                {item.name}
              </button>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-6">
          <h4 className="mb-1">Składniki w produkcie:</h4>
          <ul>
            {productIngredients.map((item, idx) => (
              <button
                className="m-1 shadow-sm shadow-gray-300 hover:shadow-lg"
                key={idx}
                onClick={() => removeItems(idx)}
              >
                {item.name}
              </button>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <button onClick={props.onClose}>Zamknij</button>
        <button>Dodaj do zamówienia</button>
      </div>
    </Modal>
  );
};

export default ProductCustomizer;
