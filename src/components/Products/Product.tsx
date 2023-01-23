import { useDispatch } from "react-redux";
import IProduct from "../../interfaces/IProduct";
import { addToCart } from "../../slices/CartSlice";

const Product = (props: { product: IProduct }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(addToCart({ product: props.product, amount: 1 }));
          }}
        >
          <h3>{props.product.name}</h3>
          <div>{props.product.price.toFixed(2)} zł</div>
        </button>
      </div>
    </li>
  );
};

export default Product;
