import { Link } from 'react-router-dom'
import Products from './Products/Products';

const Home = () => {
  return (
    <div>
      <Products />
      <div>
        <Link to="/order-method">
          <button>Cofnij</button>
        </Link>
      </div>

    </div>
  );
};

export default Home;
