import { Link } from 'react-router-dom'

const Greetings = () => {
  return (
    <div>
      <h1>Witamy w Restauracji Frontend Development!</h1>
      <Link to="/order-method">
        <button>Rozpocznij zamówienie</button>
      </Link>
    </div>
  );
};

export default Greetings;
