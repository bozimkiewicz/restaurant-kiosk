import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ICartProducts from "../../interfaces/ICartProducts";
import { decrementAmount, incrementAmount } from "../../slices/CartSlice";

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
          key={item.product.id}
        >
          <h2>
            {item.product.name} x{item.amount}, kwota:{" "}
            {item.amount * item.product.price} zł
          </h2>
          <button
            onClick={() => dispatch(decrementAmount(item))}
          >
            -
          </button>
          <button
            onClick={() => dispatch(incrementAmount(item))}
          >
            +
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h2>Koszyk</h2>
      {listedCartContent}
      <div>Całkowita kwota: {cartItemsTotal.toFixed(2)} zł</div>
      <div>
        <button>Przejdź do płatności</button>
      </div>
    </div>
  );
};

export default Cart;
