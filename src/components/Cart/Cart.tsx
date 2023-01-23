import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ICartProducts from "../../interfaces/ICartProducts";
import {
  decrementAmount,
  incrementAmount,
  removeItems,
} from "../../slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
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
        <button className="ml-5">Przejdź do płatności</button>
      </div>
    </div>
  );
};

export default Cart;
