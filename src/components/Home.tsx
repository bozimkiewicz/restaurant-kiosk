import { Link } from "react-router-dom";
import Cart from "./Cart/Cart";
import Products from "./Products/Products";

const Home = () => {
  return (
    <div>
      <div className="flex justify-between p-5 mt-5 bg-white rounded-md shadow-md">
        <Products />
        <Cart />
      </div>
      <div className="flex justify-start p-5">
        <Link to="/order-method">
          <button>Cofnij</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
