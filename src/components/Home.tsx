import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Home
      <div>
        <Link to="/order-method">
          <button>Cofnij</button>
        </Link>
      </div>

    </div>
  );
};

export default Home;
