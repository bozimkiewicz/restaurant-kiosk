import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ICartProducts from "../interfaces/ICartProducts";
import ICustomProduct from "../interfaces/ICustomProduct";
import {
  decrementAmount,
  incrementAmount,
  removeItems,
} from "../../slices/CartSlice";
import ProductCustomizer from "../Products/ProductCustomizer";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const [customizerIsShown, setCustomizerIsShown] = useState(false);

  const handleOnShow = () => {
    setCustomizerIsShown(true);
  };

  const handleOnClose = () => {
    setCustomizerIsShown(false);
  };

  const cartContent =
    useSelector<{ cart: Array<ICartProducts> }, Array<ICartProducts>>(
      (state) => state.cart
    ) || [];

  const [cartItemsTotal, setCartItemsTotal] = useState<number>(0);
  useEffect(() => {
    setCartItemsTotal(
      cartContent.reduce((p, c) => p + c.amount * c.product.price, 0)
    );
  }, [cartContent]);

  const listedCartContent = (
    <ul>
      {cartContent.map((item) => (
        <li
          className="py-5 border-solid border-b-2 border-b-my-orange-300"
          key={item.product.id}
        >
          <h2>
            {item.product.name} x{item.amount}, kwota:{" "}
            {item.amount * item.product.price} zł
          </h2>
          <button
            className="mr-1"
            onClick={() => dispatch(decrementAmount(item))}
          >
            -
          </button>
          <button onClick={() => dispatch(incrementAmount(item))}>+</button>
          <button
            className="ml-5"
            onClick={(e) => {
              e.preventDefault();
              return handleOnShow();
            }}
          >
            Dostosuj
          </button>
          {customizerIsShown && (
            <ProductCustomizer
              product={item.product}
              onClose={() => handleOnClose()}
            />
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="pl-5 border-solid border-l-2 border-l-my-orange-300">
      <h2>Koszyk</h2>
      {listedCartContent}
      <div>Całkowita kwota: {cartItemsTotal.toFixed(2)} zł</div>
      <div className="flex justify-between">
        <button onClick={() => dispatch(removeItems())}>Usuń zamówienie</button>
        <Link to="/payment">
          <button className="ml-5">Przejdź do płatności</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
