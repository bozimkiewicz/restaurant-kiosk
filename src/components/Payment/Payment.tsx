import { useSelector } from "react-redux";
import ICartProducts from "../../interfaces/ICartProducts";

const Payment = () => {
  const orderMethod = useSelector<
    { order: { method: string } },
    { method: string }
  >((state) => state.order);

  const cartContent =
    useSelector<{ cart: Array<ICartProducts> }, Array<ICartProducts>>(
      (state) => state.cart
    ) || [];

  const cartItemsTotal = cartContent.reduce((p, c) => p + c.amount * c.product.price, 0)

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
        </li>
      ))}
    </ul>
  )

  const order = {orderContent: cartContent, totalPrice: cartItemsTotal}

  return (
    <div>
      <h2>Zamówienie {orderMethod.method}</h2>
      {listedCartContent}
      <h2>Kwota do zapłaty: {cartItemsTotal.toFixed(2)} zł</h2>
      <button>Płatność kartą tutaj</button>
      <button>Płatność gotówką przy kasie</button>
    </div>
  );
};

export default Payment;
