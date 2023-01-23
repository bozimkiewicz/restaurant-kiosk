import { Link } from 'react-router-dom'

const OrderMethod = () => {
  return (
    <div>
      <h1>Wybierz sposób składania zamówienia!</h1>
      <Link to={"/home"}>
        <button>Na wynos</button>
      </Link>
      <Link to={"/home"}>
        <button>Na miejscu</button>
      </Link>
      <div>
        <Link to="/">
          <button>Cofnij</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderMethod;
