import { Link } from 'react-router-dom'
import Cart from './Cart/Cart';
import Products from './Products/Products';

const Home = () => {
  return (
    <div>
      <Products />
      <Cart />
      <div>
        <Link to="/order-method">
          <button>Cofnij</button>
        </Link>
      </div>

    </div>
  );
};

export default Home;
