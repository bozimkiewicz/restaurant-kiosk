import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setTakeIn, setTakeaway } from "../slices/OrderSlice";

const OrderMethod = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Wybierz sposób składania zamówienia!</h1>
      <Link to={"/home"}>
        <button onClick={() => dispatch(setTakeaway())}>Na wynos</button>
      </Link>
      <Link to={"/home"}>
        <button className="ml-2" onClick={() => dispatch(setTakeIn())}>
          Na miejscu
        </button>
      </Link>
      <div className="flex justify-start">
        <Link to="/">
          <button className="mt-5">Cofnij</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderMethod;
