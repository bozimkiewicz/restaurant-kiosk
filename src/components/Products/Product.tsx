import IProduct from "../../interfaces/IProduct";

const Product = (props: { product: IProduct }) => {
  return (
    <li>
      <div>
        <h3>{props.product.name}</h3>
        <div>{props.product.price.toFixed(2)} zł</div>
      </div>
    </li>
  );
};

export default Product;
