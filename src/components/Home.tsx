import { Link } from "react-router-dom";
import Cart from "./Cart/Cart";
import Products from "./Products/Products";
import { useKeycloak } from "@react-keycloak/web";

const Home = () => {
  const { keycloak } = useKeycloak();

  return (
    <div>
      <div className="flex justify-end">
        {!keycloak.authenticated && (
          <div>
            <button onClick={() => keycloak.login()}>Login</button>
          </div>
          )
        }
        {!!keycloak.authenticated && (
          <div>
            <Link to="/crud">
              <button className="ml-2">Admin Panel</button>
            </Link>
            <button className="ml-2" onClick={() => keycloak.logout()}>Logout</button>
          </div>
          )
        }
        <Link to="/home">
          <button className="ml-2">Home</button>
        </Link>
      </div>
      <div className="flex justify-between p-5 mt-5 bg-white rounded-md shadow-md">
        <Products />
        <Cart />
      </div>
      <div className="flex justify-start mt-5">
        <Link to="/order-method">
          <button>Cofnij</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
