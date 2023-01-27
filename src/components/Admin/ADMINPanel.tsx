import { Link, Route, Routes } from "react-router-dom";
import CategoriesEditor from "./CategoriesEditor";
import IngredientsEditor from "./IngredientsEditor";
import ProductEditor from "./ProductEditor";
import Statistics from "./Statistics";

const ADMINPanel = () => {
  return (
    <div>
      <div className="flex justify-end">
        <Link to="/crud">
          <button>Admin</button>
        </Link>
        <Link to="/home">
          <button className="ml-2">Home</button>
        </Link>
      </div>
      <h3>ADMIN PANEL</h3>
      <div className="mt-3">
        <Link to="/crud/statistics">
          <button>Statystyki</button>
        </Link>
        <Link to="/crud/products">
          <button className="ml-3">Produkty</button>
        </Link>
        <Link to="/crud/ingredients">
          <button className="ml-3">Składniki</button>
        </Link>
        <Link to="/crud/categories">
          <button className="ml-3">Kategorie</button>
        </Link>
        <Link to="/crud/accounts">
          <button className="ml-3">Konta administratora</button>
        </Link>
      </div>

      <Routes>
        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="/products" element={<ProductEditor />}></Route>
        <Route path="/ingredients" element={<IngredientsEditor />}></Route>
        <Route path="/categories" element={<CategoriesEditor />}></Route>
      </Routes>
      <div className="flex justify-start">
        <Link to="/home">
          <button className="mt-3">Cofnij</button>
        </Link>
      </div>
    </div>
  );
};

export default ADMINPanel;
