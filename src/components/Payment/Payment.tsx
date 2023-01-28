import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItems } from "../../slices/CartSlice";
import ICartProducts from "../interfaces/ICartProducts";

const Payment = () => {
  const dispatch = useDispatch();

  const orderMethod = useSelector<
    { order: { method: string } },
    { method: string }
  >((state) => state.order);

  const cartContent =
    useSelector<{ cart: Array<ICartProducts> }, Array<ICartProducts>>(
      (state) => state.cart
    ) || [];

  const cartItemsTotal = cartContent.reduce(
    (p, c) => p + c.amount * c.product.price,
    0
  );

  const navigate = useNavigate();

  const newOrder = (payment: string) => {
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment: payment,
        order_method: orderMethod.method,
        items: JSON.stringify(cartContent),
        total: cartItemsTotal,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(removeItems());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

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
  );

  return (
    <div>
      <div>
        <h2>Zamówienie {orderMethod.method}</h2>
        {listedCartContent}
        <h2>Kwota do zapłaty: {cartItemsTotal.toFixed(2)} zł</h2>
        <button className="mr-3" onClick={() => newOrder("card")}>
          Płatność kartą tutaj
        </button>
        <button onClick={() => newOrder("cash")}>
          Płatność gotówką przy kasie
        </button>
      </div>
      <div className="flex justify-start mt-5">
        <Link to="/home">
          <button>Cofnij</button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
